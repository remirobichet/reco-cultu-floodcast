<template>
  <div class="flex min-h-screen w-full flex-col">
    <header class="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav
        class="hidden shrink-0 flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <NuxtLink to="/" class="flex items-center gap-2 text-lg font-semibold md:text-base">
          <Podcast class="h-6 w-6" />
          <span class="sr-only">Recommandations culturelles Floodcast</span>
        </NuxtLink>
        <NuxtLink to="/" exact-active-class="text-muted-foreground"
          class="text-foreground transition-colors hover:text-muted-foreground">
          Épisodes
        </NuxtLink>
        <NuxtLink to="/participants" exact-active-class="text-muted-foreground"
          class="text-foreground transition-colors hover:text-muted-foreground">
          Participants
        </NuxtLink>
      </nav>
      <Sheet v-model:open="navigationOpen">
        <SheetTrigger as-child>
          <Button variant="outline" size="icon" class="shrink-0 md:hidden">
            <Menu class="h-5 w-5" />
            <span class="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav class="grid gap-6 text-lg font-medium">
            <NuxtLink to="#" class="flex items-center gap-2 text-lg font-semibold">
              <Podcast class="h-6 w-6" />
              <span class="sr-only">Recommandations culturelles Floodcast</span>
            </NuxtLink>
            <NuxtLink to="/" exact-active-class="text-muted-foreground"
              class="text-foreground transition-colors hover:text-muted-foreground" @click="navigationOpen = false">
              Épisodes
            </NuxtLink>
            <NuxtLink to="/participants" exact-active-class="text-muted-foreground"
              class="text-foreground transition-colors hover:text-muted-foreground" @click="navigationOpen = false">
              Participants
            </NuxtLink>
          </nav>
        </SheetContent>
      </Sheet>
      <div class="flex w-full items-center gap-4 ml-auto md:gap-2 lg:gap-4">
        <div class="grow">
          <div class="flex justify-center ml-auto flex-1 sm:flex-initial">
            <SearchDialog />
          </div>
        </div>
        <div class="flex-1 flex-initial flex items-center gap-2">
          <Button variant="outline" size="sm" @click="mailto">
            <TooltipProvider :delay-duration="100">
              <Tooltip>
                <TooltipTrigger>Contact</TooltipTrigger>
                <TooltipContent>
                  <p class="text-md text-muted-foreground text-center">👋 Une erreure, une idée, une amélioration ?
                    <br>Clique ici pour me contacter
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Button>
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

const navigationOpen = ref(false)

const mailto = () => {
  window.location.href = 'mailto:remi.robichet@gmail.com'
}
</script>
