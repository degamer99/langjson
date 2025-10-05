"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import Header from "@/components/header"
import { useComponentStore } from "@/store/userStore";

const Test = () => {
  const exampleData = [
    {
      "id": 1,
      "language": "إِنَّ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ",
      "translation": "Indeed, in the creation of the heavens and the earth...",
      "wordByWord": [
        {
          "language": "إنّ",
          "translation": "Indeed"
        },
        {
          "language": "في",
          "translation": "in"
        },
        {
          "language": "خلق",
          "translation": "the creation of"
        },
        {
          "language": "السماوات",
          "translation": "the heavens"
        },
        {
          "language": "والأرض",
          "translation": "and the earth"
        }
      ],
      "metadata": "Example phrase 1"
    },
  ]

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
  const [data, setData] = useState<Verse[]>([]); // ✅ strongly typed
  const [direction, setDirection] = useState<"rtl" | "ltr">("rtl");
  const [theme, setTheme] = useState<"light" | "sepia" | "dark">("dark");
  const [languageVisibility, setLanguageVisibility] = useState<boolean>(false);
  const jsonRef = useRef<HTMLInputElement | null>(null)

  const { wordByWordVisibility } = useComponentStore()

  const importJson = () => {
    console.log("Impost Json")
    setData([{
      id: 0,
      language: "",
      translation: "",
      wordByWord: [],
      metadata: ""
    }])
    jsonRef.current?.click()
  }
  const switchRTL = () => {
    setDirection((prev) => (prev === "rtl" ? "ltr" : "rtl"))

  }

  const handleLanguage = () => {
    setLanguageVisibility(x => !x)
  }

  const handleTheme = (inputTheme: ("light" | "sepia" | "dark")) => {
    setTheme(inputTheme)
  }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);

        // Ensure array
        const parsedArray: Verse[] = Array.isArray(parsed) ? parsed : [parsed];

        // Update state (append to existing data if needed)
        setData((prev) => {
          const newData = [...prev, ...parsedArray];
          console.log("New data inside setState:", newData);
          return newData;
        });
      } catch (err) {
        console.error("Invalid JSON file:", err);
      }
    };

    reader.readAsText(file);
  };

  // 👀 Log data whenever it changes
  useEffect(() => {
    console.log("Updated data:", data);
  }, [data]);


  return (
    <SidebarProvider>
      <AppSidebar importJson={importJson} switchRTL={switchRTL} handleTheme={handleTheme} languageVisibility={languageVisibility} handleLanguage={handleLanguage} />
      {/* <SidebarTrigger /> */}

      <main className={`flex flex-col items-center justify-center min-h-screen w-full overflow-hidden ${theme} sepia:bg-sepia-100 dark:bg-gray-900`}>
        <Header />
        <div className="my-auto">
          <Input ref={jsonRef} type="file" accept=".json" onChange={handleFileChange} hidden={data && data.length > 0} />
        </div>

        <div
          className="flex flex-wrap justify-center gap-4 text-2xl mb-4 sepia:text-gray-900 dark:text-gray-200 "
          dir={direction} // <-- controls layout direction
        >
          {data && data.length > 0 ? (
            data.map(({ id, language, translation, wordByWord, metadata }, index) => (
              <section key={index} className="w-9/12 border-b-2 py-8">
                <p className={`text-2xl ${languageVisibility ? "" : "hidden"}`}>{`${language}`}</p>

                {/* Word-by-word */}
                <div className={`flex gap-4 flex-wrap my-4 ${wordByWordVisibility ? "" : "hidden"}`}>
                  {wordByWord.map((word, i) => (
                    <div key={i} className=" flex flex-col text-lg">
                      {/* <span className="font-arabic text-3xl">{word.language}</span> */}
                      <span className="">{word.language}</span>
                      <span className="">{word.translation}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xl">{`${translation}`}</p>
              </section>
            ))) : (
            <p>No data loaded yet.</p>
          )}
        </div>
      </main>
    </SidebarProvider >
  );
};

export default Test;
