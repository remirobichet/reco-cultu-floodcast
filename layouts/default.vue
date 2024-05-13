<template>
  <div class="flex min-h-screen w-full flex-col">
    <header class="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav
        class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <a href="/" class="flex items-center gap-2 text-lg font-semibold md:text-base">
          <Podcast class="h-6 w-6" />
          <span class="sr-only">Recommandations culturelles Floodcast</span>
        </a>
        <a href="/" class="text-foreground transition-colors hover:text-foreground">
          Épisodes
        </a>
        <a href="/participants" class="text-muted-foreground transition-colors hover:text-foreground">
          Participants
        </a>
      </nav>
      <Sheet>
        <SheetTrigger as-child>
          <Button variant="outline" size="icon" class="shrink-0 md:hidden">
            <Menu class="h-5 w-5" />
            <span class="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav class="grid gap-6 text-lg font-medium">
            <a href="#" class="flex items-center gap-2 text-lg font-semibold">
              <Podcast class="h-6 w-6" />
              <span class="sr-only">Recommandations culturelles Floodcast</span>
            </a>
            <a href="/" class="hover:text-foreground">
              Épisodes
            </a>
            <a href="/participants" class="text-muted-foreground hover:text-foreground">
              Participants
            </a>
          </nav>
        </SheetContent>
      </Sheet>
      <div class="flex w-full items-center gap-4 ml-auto md:gap-2 lg:gap-4">
        <div class="ml-auto flex-1 flex-initial">
          <ThemeSwitch />
        </div>
      </div>
    </header>
    <main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { Menu, Podcast } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
</script>
