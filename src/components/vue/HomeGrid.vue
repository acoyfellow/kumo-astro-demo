<!--
  Native VUE homepage grid — a 1:1 rebuild of the kumo-ui.com HomeGrid
  (see /tmp/kumo-golden/HomeGrid.tsx) rendered with the compiled-native
  @acoyfellow/kumo-vue components. Same sections and grid geometry as the golden
  `/` React route, zero React shipped.

  Interactive/compound Kumo components (Select, Combobox, Dialog, Popover,
  DropdownMenu, Radio) consume the compiler's native `fixture` contract.
  Structural compounds (Table, LayerCard) use the native sub-components,
  aliased out of the composed component for the template. No raw-HTML
  injection, no demo-CSS, no hand-rolled lookalikes.
-->
<script setup lang="ts">
import {
  Badge, Banner, Button, Checkbox, ClipboardText, Code, Combobox,
  DateRangePicker, Dialog, DropdownMenu, Grid, GridItem, Input, InputArea,
  Label, LayerCard, Loader, MenuBar, Meter, Pagination, Popover, Radio, Select,
  SensitiveInput, Surface, Switch, Table, Tabs, Text, Toasty,
} from '@acoyfellow/kumo-vue';
import { ref } from 'vue';

const TableHeader = Table.Header;
const TableBody = Table.Body;
const TableRow = Table.Row;
const TableHead = Table.Head;
const TableCell = Table.Cell;
const LayerCardPrimary = LayerCard.Primary;
const LayerCardSecondary = LayerCard.Secondary;

const routeOf = (id: string) => `/components/${id}`;
const paginationPage = ref(1);
const setPaginationPage = (page: number) => { paginationPage.value = page; };

const selectFixture = {
  export: 'root', props: {}, children: [
    { export: '.Option', props: { value: 'all' }, children: [{ text: 'All deployed versions' }] },
    { export: '.Option', props: { value: 'active' }, children: [{ text: 'Active versions' }] },
    { export: '.Option', props: { value: 'specific' }, children: [{ text: 'Specific versions' }] },
  ],
};
const comboboxFixture = {
  children: [
    { export: '.TriggerInput', props: { placeholder: 'Select an issue...' } },
    { export: '.Content', children: [
      { export: '.List', children: [
        { export: '.Item', props: { value: 'bug' }, children: [{ text: 'bug' }] },
        { export: '.Item', props: { value: 'documentation' }, children: [{ text: 'documentation' }] },
        { export: '.Item', props: { value: 'enhancement' }, children: [{ text: 'enhancement' }] },
        { export: '.Item', props: { value: 'help wanted' }, children: [{ text: 'help wanted' }] },
        { export: '.Item', props: { value: 'good first issue' }, children: [{ text: 'good first issue' }] },
      ]},
    ]},
  ],
};
const dialogFixture = {
  children: [
    { export: '.Trigger', children: [{ text: 'Click me!' }] },
    { export: '.Dialog', children: [
      { export: '.Title', children: [{ text: 'Hello!' }] },
      { export: '.Description', children: [{ text: "I'm a dialog." }] },
    ]},
  ],
};
const dropdownFixture = {
  children: [
    { export: '.Trigger', children: [{ text: 'Add' }] },
    { export: '.Content', children: [
      { export: '.Item', children: [{ text: 'Worker' }] },
      { export: '.Item', children: [{ text: 'Pages' }] },
    ]},
  ],
};
const popoverFixture = {
  children: [
    { export: '.Trigger', children: [{ text: 'Open Popover' }] },
    { export: '.Content', children: [
      { export: '.Title', children: [{ text: 'Popover Title' }] },
      { export: '.Description', children: [{ text: 'This is a popover.' }] },
    ]},
  ],
};
const radioFixture = {
  kind: 'radio-group', legend: 'Select option', defaultValue: 'option1',
  items: [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ],
};
const tabs = [
  { value: 'home', label: 'Home' },
  { value: 'about', label: 'About' },
  { value: 'contact', label: 'Contact' },
];
const menuOptions = [
  { icon: 'B', onClick: () => {}, tooltip: 'Bold' },
  { icon: 'I', onClick: () => {}, tooltip: 'Italic' },
];
</script>

<template>
  <ul class="grid auto-rows-min grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
    <li class="relative flex aspect-square items-center justify-center bg-kumo-elevated ring-1 ring-kumo-line">
      <a :href="routeOf('button')" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Button</a>
      <div class="grid gap-3">
        <Button>Create Worker</Button>
        <Button variant="primary">Create Worker</Button>
        <Button :loading="true">Create Worker</Button>
      </div>
    </li>

    <li class="relative flex aspect-square items-center justify-center bg-kumo-elevated ring-1 ring-kumo-line">
      <a :href="routeOf('input')" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Input</a>
      <div class="grid gap-3">
        <Input placeholder="Type something..." />
        <Input default-value="Invalid!" />
      </div>
    </li>

    <li class="relative flex aspect-square items-center justify-center bg-kumo-elevated ring-1 ring-kumo-line">
      <a :href="routeOf('select')" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Select</a>
      <Select placeholder="Select a version..." :fixture="selectFixture" />
    </li>

    <li class="relative flex aspect-square items-center justify-center bg-kumo-elevated ring-1 ring-kumo-line">
      <a :href="routeOf('combobox')" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Combobox</a>
      <Combobox :fixture="comboboxFixture" />
    </li>

    <li class="relative flex aspect-square items-center justify-center bg-kumo-elevated ring-1 ring-kumo-line">
      <a :href="routeOf('switch')" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Switch</a>
      <Switch :default-checked="true" />
    </li>

    <li class="relative flex aspect-square items-center justify-center bg-kumo-elevated ring-1 ring-kumo-line">
      <a :href="routeOf('input')" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Input (with validation)</a>
      <Input label="Email" placeholder="name@example.com" type="email" />
    </li>

    <li class="relative flex aspect-square items-center justify-center bg-kumo-elevated ring-1 ring-kumo-line">
      <a :href="routeOf('dialog')" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Dialog</a>
      <Dialog :fixture="dialogFixture" />
    </li>

    <li class="relative flex aspect-square items-center justify-center bg-kumo-elevated ring-1 ring-kumo-line">
      <a :href="routeOf('tooltip')" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Tooltip</a>
      <div class="flex gap-2">
        <Button>Add</Button>
        <Button>Translate</Button>
      </div>
    </li>

    <li class="relative flex aspect-square items-center justify-center bg-kumo-elevated ring-1 ring-kumo-line">
      <a :href="routeOf('dropdown')" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Dropdown</a>
      <DropdownMenu :fixture="dropdownFixture" />
    </li>

    <li class="relative flex aspect-square items-center justify-center bg-kumo-elevated ring-1 ring-kumo-line">
      <a :href="routeOf('collapsible')" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Collapsible</a>
      <div class="flex w-[200px] flex-col gap-1">
        <span class="text-base font-medium text-kumo-default">What is Kumo?</span>
        <span class="text-sm text-kumo-subtle">Kumo is Cloudflare's component library.</span>
      </div>
    </li>

    <li class="relative flex aspect-square items-center justify-center bg-kumo-elevated ring-1 ring-kumo-line">
      <a :href="routeOf('checkbox')" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Checkbox</a>
      <Checkbox label="Max bandwidth" :default-checked="true" />
    </li>

    <li class="relative flex aspect-square items-center justify-center bg-kumo-elevated ring-1 ring-kumo-line">
      <a :href="routeOf('layer-card')" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">LayerCard</a>
      <LayerCard class-name="w-[200px]">
        <LayerCardSecondary>Next Steps</LayerCardSecondary>
        <LayerCardPrimary>Hello</LayerCardPrimary>
      </LayerCard>
    </li>

    <li class="relative flex aspect-square items-center justify-center bg-kumo-elevated ring-1 ring-kumo-line">
      <a :href="routeOf('loader')" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Loader</a>
      <Loader />
    </li>

    <li class="relative flex aspect-square items-center justify-center bg-kumo-elevated ring-1 ring-kumo-line">
      <a :href="routeOf('skeleton-line')" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">SkeletonLine</a>
      <span class="text-xs text-kumo-inactive italic">no native emitter yet</span>
    </li>

    <li class="relative flex aspect-square items-center justify-center bg-kumo-elevated ring-1 ring-kumo-line">
      <a :href="routeOf('surface')" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Surface</a>
      <Surface class-name="flex h-24 w-40 items-center justify-center rounded-lg bg-kumo-base text-sm text-kumo-subtle"><em>To put things over.</em></Surface>
    </li>

    <li class="relative flex aspect-square items-center justify-center bg-kumo-elevated ring-1 ring-kumo-line">
      <a :href="routeOf('code')" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Code</a>
      <Code lang="ts" code='const a = callMyFunction("hello")' />
    </li>

    <li class="relative flex aspect-square items-center justify-center bg-kumo-elevated ring-1 ring-kumo-line">
      <a :href="routeOf('banner')" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Banner</a>
      <div class="flex flex-col gap-2">
        <Banner variant="default">This is a default banner.</Banner>
        <Banner variant="alert">This is an alert banner.</Banner>
        <Banner variant="error">This is an error banner.</Banner>
      </div>
    </li>

    <li class="relative flex aspect-square items-center justify-center bg-kumo-elevated ring-1 ring-kumo-line">
      <a :href="routeOf('tabs')" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Tabs</a>
      <Tabs :tabs="tabs" />
    </li>

    <li class="relative flex aspect-square items-center justify-center bg-kumo-elevated ring-1 ring-kumo-line">
      <a :href="routeOf('badge')" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Badge</a>
      <div class="flex flex-col gap-2">
        <Badge variant="primary">Primary</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="beta">Beta</Badge>
        <Badge variant="destructive">Destructive</Badge>
      </div>
    </li>

    <li class="relative flex aspect-square items-center justify-center bg-kumo-elevated ring-1 ring-kumo-line">
      <a :href="routeOf('toast')" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Toast</a>
      <Toasty><Button>Give me a toast</Button></Toasty>
    </li>

    <li class="relative flex aspect-square items-center justify-center bg-kumo-elevated ring-1 ring-kumo-line">
      <a :href="routeOf('pagination')" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Pagination</a>
      <Pagination :page="paginationPage" :per-page="10" :total-count="100" :set-page="setPaginationPage" />
    </li>

    <li class="relative flex aspect-square items-center justify-center bg-kumo-elevated ring-1 ring-kumo-line">
      <a :href="routeOf('input-area')" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">InputArea</a>
      <InputArea placeholder="Enter your name" />
    </li>

    <li class="relative flex aspect-square items-center justify-center bg-kumo-elevated ring-1 ring-kumo-line">
      <a :href="routeOf('meter')" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Meter</a>
      <div class="w-full px-4"><Meter :value="75" label="My meter" custom-value="100 / 5,000" /></div>
    </li>

    <li class="relative flex aspect-square items-center justify-center bg-kumo-elevated ring-1 ring-kumo-line">
      <a :href="routeOf('menubar')" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">MenuBar</a>
      <MenuBar :is-active="0" :options="menuOptions" />
    </li>

    <li class="relative flex aspect-square items-center justify-center bg-kumo-elevated ring-1 ring-kumo-line">
      <a :href="routeOf('date-range-picker')" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">DateRangePicker</a>
      <div class="scale-90"><DateRangePicker /></div>
    </li>

    <li class="relative flex aspect-square items-center justify-center bg-kumo-elevated ring-1 ring-kumo-line">
      <a :href="routeOf('breadcrumbs')" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Breadcrumbs</a>
      <div class="flex items-center gap-1 text-sm">
        <span class="text-kumo-subtle">Home</span>
        <span class="text-kumo-inactive">/</span>
        <span class="text-kumo-subtle">Docs</span>
        <span class="text-kumo-inactive">/</span>
        <span class="font-medium">Page</span>
      </div>
    </li>

    <li class="relative flex aspect-square items-center justify-center bg-kumo-elevated ring-1 ring-kumo-line">
      <a :href="routeOf('clipboard-text')" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">ClipboardText</a>
      <ClipboardText text="npx kumo add button" />
    </li>

    <li class="relative flex aspect-square items-center justify-center bg-kumo-elevated ring-1 ring-kumo-line">
      <a :href="routeOf('command-palette')" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">CommandPalette</a>
      <Button>Open Command Palette</Button>
    </li>

    <li class="relative flex aspect-square items-center justify-center bg-kumo-elevated ring-1 ring-kumo-line">
      <a :href="routeOf('empty')" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Empty</a>
      <div class="flex flex-col items-center gap-1 text-center">
        <span class="text-sm font-medium">No results</span>
        <span class="text-xs text-kumo-subtle">Try a different search</span>
      </div>
    </li>

    <li class="relative flex aspect-square items-center justify-center bg-kumo-elevated ring-1 ring-kumo-line">
      <a :href="routeOf('grid')" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Grid</a>
      <Grid variant="side-by-side" gap="sm" class-name="w-[140px]">
        <GridItem class-name="rounded bg-kumo-control p-3 text-center text-xs">1</GridItem>
        <GridItem class-name="rounded bg-kumo-control p-3 text-center text-xs">2</GridItem>
        <GridItem class-name="rounded bg-kumo-control p-3 text-center text-xs">3</GridItem>
        <GridItem class-name="rounded bg-kumo-control p-3 text-center text-xs">4</GridItem>
      </Grid>
    </li>

    <li class="relative flex aspect-square items-center justify-center bg-kumo-elevated ring-1 ring-kumo-line">
      <a :href="routeOf('label')" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Label</a>
      <div class="flex flex-col gap-2">
        <Label>Default Label</Label>
        <Label :show-optional="true">Optional Field</Label>
        <Label tooltip="More info">With Tooltip</Label>
      </div>
    </li>

    <li class="relative flex aspect-square items-center justify-center bg-kumo-elevated ring-1 ring-kumo-line">
      <a :href="routeOf('popover')" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Popover</a>
      <Popover :fixture="popoverFixture" />
    </li>

    <li class="relative flex aspect-square items-center justify-center bg-kumo-elevated ring-1 ring-kumo-line">
      <a :href="routeOf('radio')" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Radio</a>
      <Radio :fixture="radioFixture" />
    </li>

    <li class="relative flex aspect-square items-center justify-center bg-kumo-elevated ring-1 ring-kumo-line">
      <a :href="routeOf('sensitive-input')" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">SensitiveInput</a>
      <SensitiveInput default-value="super-secret-api-key" />
    </li>

    <li class="relative flex aspect-square items-center justify-center bg-kumo-elevated ring-1 ring-kumo-line">
      <a :href="routeOf('table')" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Table</a>
      <Table class-name="w-[200px] text-sm">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow><TableCell>Worker 1</TableCell><TableCell>Active</TableCell></TableRow>
          <TableRow><TableCell>Worker 2</TableCell><TableCell>Paused</TableCell></TableRow>
          <TableRow><TableCell>Worker 3</TableCell><TableCell>Active</TableCell></TableRow>
        </TableBody>
      </Table>
    </li>

    <li class="relative flex aspect-square items-center justify-center bg-kumo-elevated ring-1 ring-kumo-line">
      <a :href="routeOf('text')" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Text</a>
      <div class="flex flex-col gap-1">
        <Text size="lg" :bold="true">Large Bold Text</Text>
        <Text size="base">Regular text content</Text>
        <Text size="sm">Small subtle text</Text>
      </div>
    </li>
  </ul>
</template>
