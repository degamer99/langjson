// components/flashcard-quiz.tsx
"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel, // Hook to access carousel state
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
// import { ChevronDown, ChevronUp, Maximize2, Minimize2, Lightbulb, X, Play } from "lucide-react";
import { Lightbulb, X, Play } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

// ---
// Types (must be consistent with your Test component)
// ---

interface WordByWord {
  language: string;
  translation: string;
}

interface Verse {
  id: number;
  language: string;
  translation: string;
  wordByWord: WordByWord[];
  metadata: string;
}

interface FlashcardQuizProps {
  data: Verse[]; // Now accepts the full data array
  triggerText?: string;
}

// ---
// Flashcard Component (Simplified Flip)
// ---

interface FlashcardProps {
  word: WordByWord;
  dir: "rtl" | "ltr";
}

const Flashcard = ({ word, dir }: FlashcardProps) => {
  const [showTranslation, setShowTranslation] = useState(false);

  // Reset state when word changes (i.e., carousel slides)
  useEffect(() => {
    setShowTranslation(false);
  }, [word]);

  return (
    <div
      className="flex flex-col items-center justify-center p-1 w-full h-[300px] cursor-pointer overflow-hidden"
      onClick={() => setShowTranslation((prev) => !prev)}
    >
      <Card
        className={cn(
          "w-full h-full p-6 flex flex-col justify-center items-center transition-all duration-300 ease-in-out shadow-lg border-2",
          showTranslation ? "border-primary/80 bg-primary/5" : "border-border"
        )}
      >
        <CardContent
          className={cn(
            "p-0 flex flex-col items-center justify-center w-full",
            dir === "rtl" ? "font-arabic" : ""
          )}
        >
          {/* Always Visible Word */}
          <p className="text-4xl font-bold mb-4">{word.language}</p>

          <Separator className="w-1/3 my-2" />

          {/* Translation (Appears on Click) */}
          <div
            className={cn(
              "overflow-hidden transition-[max-height] duration-500 ease-in-out",
              showTranslation ? "max-h-40 opacity-100 mt-4" : "max-h-0 opacity-0"
            )}
          >
            <p className="text-3xl text-primary font-semibold text-center">
              {word.translation}
            </p>
          </div>

          {/* Hint/Prompt */}
          <div className="mt-6 text-sm text-muted-foreground flex items-center">
            <Lightbulb className="h-4 w-4 mr-1 text-yellow-500" />
            {showTranslation ? 'Click to hide translation' : 'Click to show translation'}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// ---
// Quiz Controls and Main Component
// ---

const QuizControls = ({
  verses,
  selectedVerseId,
  setSelectedVerseId,
  startRange,
  setStartRange,
  endRange,
  setEndRange,
  maxWords,
  onStartQuiz,
}: {
  verses: Verse[];
  selectedVerseId: string;
  setSelectedVerseId: (id: string) => void;
  startRange: number;
  setStartRange: (val: number) => void;
  endRange: number;
  setEndRange: (val: number) => void;
  maxWords: number;
  onStartQuiz: () => void;
}) => {
  const handleRangeChange = (type: 'start' | 'end', value: string) => {
    let num = parseInt(value, 10);
    if (isNaN(num)) return;

    if (type === 'start') {
      // Ensure start is at least 1 and not greater than end or max
      num = Math.min(maxWords, Math.max(1, num));
      setStartRange(num);
      // If start > end, set end = start
      if (num > endRange) setEndRange(num);
    } else {
      // Ensure end is at least start and not greater than max
      num = Math.min(maxWords, Math.max(startRange, num));
      setEndRange(num);
    }
  };

  const isQuizReady = maxWords > 0 && startRange <= endRange;

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-secondary/20">
      <h3 className="text-xl font-semibold flex items-center text-primary">
        <Play className="h-5 w-5 mr-2" />
        Configure Quiz
      </h3>

      {/* Verse Selection */}
      <div className="grid gap-2">
        <Label htmlFor="verse-select">Select Paragraph/Verse</Label>
        <Select value={selectedVerseId} onValueChange={setSelectedVerseId}>
          <SelectTrigger id="verse-select" className="w-full">
            <SelectValue placeholder="Select a verse" />
          </SelectTrigger>
          <SelectContent>
            {verses.map((verse) => (
              <SelectItem key={verse.id} value={String(verse.id)}>
                {verse.metadata || `Paragraph ${verse.id}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Word Range Selection */}
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="start-range">Start Word (1-{maxWords || 1})</Label>
          <Input
            id="start-range"
            type="number"
            value={startRange}
            onChange={(e) => handleRangeChange('start', e.target.value)}
            min={1}
            max={maxWords}
            disabled={maxWords === 0}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="end-range">End Word (1-{maxWords || 1})</Label>
          <Input
            id="end-range"
            type="number"
            value={endRange}
            onChange={(e) => handleRangeChange('end', e.target.value)}
            min={startRange}
            max={maxWords}
            disabled={maxWords === 0}
          />
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-2">
        Total cards: **{endRange - startRange + 1}**
      </p>

      <Button
        onClick={onStartQuiz}
        disabled={!isQuizReady}
        className="w-full mt-4"
      >
        Start Quiz
      </Button>
    </div>
  );
};


// New component to display the current card count
const CarouselCounter = ({ totalCards }: { totalCards: number }) => {
  // 💡 This component is rendered inside <Carousel> so it can safely call useCarousel()
  const { api } = useCarousel();
  const [current, setCurrent] = useState(1); // Start at 1

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap() + 1);

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="absolute bottom-[-40px] w-full text-center text-sm text-muted-foreground">
      Card {current} of {totalCards}
    </div>
  );
};

const QuizCarousel = ({ cards, direction }: { cards: WordByWord[], direction: string }) => {
  // ❌ Do NOT call useCarousel() here. We rely on the inner component.

  return (
    <div className="relative w-full">
      <Carousel
        className="w-full max-w-sm sm:max-w-lg md:max-w-xl mx-auto"
        opts={{ loop: true }}
      >
        <CarouselContent className="h-[350px]">
          {cards.map((word, index) => (
            <CarouselItem key={index}>
              <Flashcard word={word} dir={direction as "rtl" | "ltr"} />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation is a direct child of Carousel, which is fine */}
        <CarouselPrevious className="top-1/2 -left-12 transform -translate-y-1/2 sm:-left-16" />
        <CarouselNext className="top-1/2 -right-12 transform -translate-y-1/2 sm:-right-16" />

        {/* 🚀 Render the counter here, as a child of Carousel */}
        <CarouselCounter totalCards={cards.length} />

      </Carousel>
    </div>
  );
}

export const FlashcardQuiz = ({
  data,
  triggerText = "Flashcard Quiz",
}: FlashcardQuizProps) => {
  const [open, setOpen] = useState(false);
  const [isQuizzing, setIsQuizzing] = useState(false);
  const isDesktop = !useIsMobile();

  // ✅ Move hooks here before any conditional return
  const [selectedVerseId, setSelectedVerseId] = useState(String(data[0]?.id || 0));
  const [startRange, setStartRange] = useState(1);
  const [endRange, setEndRange] = useState(0);
  const [quizCards, setQuizCards] = useState<WordByWord[]>([]);

  const selectedVerse = data.find(v => String(v.id) === selectedVerseId);
  const maxWords = selectedVerse?.wordByWord.length || 0;

  useEffect(() => {
    if (maxWords > 0) {
      setEndRange(maxWords);
    } else {
      setEndRange(0);
    }
  }, [maxWords, selectedVerseId]);

  const handleStartQuiz = () => {
    if (!selectedVerse || startRange > endRange || startRange < 1) return;
    const cards = selectedVerse.wordByWord.slice(startRange - 1, endRange);
    setQuizCards(cards);
    setIsQuizzing(true);
  };

  const handleStopQuiz = () => {
    setIsQuizzing(false);
    setQuizCards([]);
  };

  const direction =
    (typeof document !== "undefined" &&
      document.documentElement.getAttribute("dir")) ||
    "rtl";

  // ✅ Instead of returning early, just conditionally render
  if (data.length === 0) {
    return <Button variant="outline" disabled>No data loaded for quiz</Button>;
  }

  const Content = (
    <div className="w-full max-w-xl mx-auto p-4">
      {isQuizzing ? (
        <>
          <QuizCarousel cards={quizCards} direction={direction} />
          <Button
            variant="outline"
            className="w-full mt-10"
            onClick={handleStopQuiz}
          >
            <X className="h-4 w-4 mr-2" /> End Quiz
          </Button>
        </>
      ) : (
        <QuizControls
          verses={data}
          selectedVerseId={selectedVerseId}
          setSelectedVerseId={setSelectedVerseId}
          startRange={startRange}
          setStartRange={setStartRange}
          endRange={endRange}
          setEndRange={setEndRange}
          maxWords={maxWords}
          onStartQuiz={handleStartQuiz}
        />
      )}
    </div>
  );

  const Title = isQuizzing
    ? `Quiz: ${selectedVerse?.metadata || `Verse ${selectedVerseId}`} (${startRange}-${endRange})`
    : "Configure Flashcard Quiz";

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default" className="text-lg px-6 py-3">
            {triggerText}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[800px] w-[90%] p-10">
          <DialogHeader>
            <DialogTitle>{Title}</DialogTitle>
          </DialogHeader>
          {Content}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="default" className="text-lg px-6 py-3">
          {triggerText}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{Title}</DrawerTitle>
        </DrawerHeader>
        {Content}
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
