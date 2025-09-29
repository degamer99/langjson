"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface AppSidebarProps {
  importJson: () => void; // function that returns nothing
  switchRTL: () => void; // function that returns nothing
}

export function AppSidebar({ importJson, switchRTL }: AppSidebarProps) {
  return (
    // <Sidebar className="w-2/5">
    <Sidebar className="">
      <SidebarHeader>
        <h2 className="text-lg font-semibold">Settings</h2>
      </SidebarHeader>
      <SidebarContent className="space-y-6 p-4">
        {/* Theme Section */}
        <SidebarGroup>
          <h3 className="text-sm font-medium mb-2">Theme</h3>
          <div className="flex items-center justify-between space-x-2 overflow-auto">
            <Button size="sm" variant="outline">Auto</Button>
            <Button size="sm" variant="outline">Light</Button>
            <Button size="sm" variant="outline">Sepia</Button>
            <Button size="sm" variant="outline">Dark</Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            The system theme automatically adapts to your light/dark mode settings
          </p>
        </SidebarGroup>

        <Separator />

        {/* Quran Font Section */}
        <SidebarGroup>
          <h3 className="text-sm font-medium mb-2">Quran Font</h3>
          <div className="flex space-x-2 overflow-auto">
            <Button size="sm" variant="outline">Uthmani</Button>
            <Button size="sm" variant="outline">IndoPak</Button>
            <Button size="sm" variant="outline">Tajweed</Button>
          </div>

          <div className="mt-3">
            <Label className="text-xs">Style</Label>
            <Select defaultValue="king-fahad">
              <SelectTrigger>
                <SelectValue placeholder="Choose style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="king-fahad">King Fahad Complex</SelectItem>
                <SelectItem value="me-quran">Me Quran</SelectItem>
                <SelectItem value="naskh">Naskh</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-3">
            <Label className="text-xs">Font size</Label>
            <div className="flex items-center space-x-2">
              <Button size="icon" variant="outline">-</Button>
              <Slider defaultValue={[3]} max={6} step={1} className="w-32" />
              <Button size="icon" variant="outline">+</Button>
            </div>
          </div>

          <p className="text-xs text-muted-foreground mt-2">
            King Fahad Complex (V1 and V2) Fonts provide higher quality but take longer to load
          </p>

          <div className="mt-3 p-3 border rounded-md text-center">
            <p className="font-arabic text-lg leading-relaxed">
              أُو۟لَٰٓئِكَ عَلَىٰ هُدًۭى مِّن رَّبِّهِمْ ۖ
              وَأُو۟لَٰٓئِكَ هُمُ ٱلْمُفْلِحُونَ
            </p>
          </div>
        </SidebarGroup>

        <Separator />

        {/* Word By Word Section */}
        <SidebarGroup>
          <h3 className="text-sm font-medium mb-2">Word By Word</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="translation">Translation</Label>
              <Switch id="translation" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="transliteration">Transliteration</Label>
              <Switch id="transliteration" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="recitation">Recitation</Label>
              <Switch id="recitation" />
            </div>
          </div>

          <div className="mt-3">
            <Label className="text-xs">Translation Language</Label>
            <Select defaultValue="english">
              <SelectTrigger>
                <SelectValue placeholder="Choose language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="french">French</SelectItem>
                <SelectItem value="urdu">Urdu</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <br />
          <Button onClick={importJson}>Import Json</Button>
          <br />
          <Button onClick={switchRTL}>Switch RTL</Button>

          <p className="text-xs text-muted-foreground mt-2">
            Word by word translation source: QuranWBW. This source is independent of the verse translation selection.
          </p>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <p className="text-xs text-muted-foreground">Display</p>
      </SidebarFooter>
    </Sidebar>
  )
}
