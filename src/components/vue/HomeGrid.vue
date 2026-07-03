<!--
  Native VUE homepage grid matching the canonical kumo-ui.com HomeGrid
  (see /tmp/kumo-golden/HomeGrid.tsx) with the currently exported
  @acoyfellow/kumo-vue components. Interactive compound components consume
  the compiler's native `fixture` contract; unavailable native components are
  called out rather than recreated with local lookalikes.
-->
<script setup lang="ts">
import {
  Badge, Banner, Button, Checkbox, ClipboardText, Code, Combobox,
  DateRangePicker, Dialog, DropdownMenu, Grid, GridItem, Input, InputArea,
  Label, LayerCard, Loader, MenuBar, Meter, Pagination, Popover, Radio, Select,
  SensitiveInput, Surface, Switch, Table, Tabs, Text, Toasty, createKumoToastManager,
  Tooltip, Collapsible, SkeletonLine,
} from '@acoyfellow/kumo-vue';
import { ref } from 'vue';

const toastManager = createKumoToastManager();

const TableHeader = Table.Header;
const TableBody = Table.Body;
const TableRow = Table.Row;
const TableHead = Table.Head;
const TableCell = Table.Cell;
const LayerCardPrimary = LayerCard.Primary;
const LayerCardSecondary = LayerCard.Secondary;

const componentRoutes: Record<string, string> = {
  badge: '/components/badge',
  banner: '/components/banner',
  breadcrumbs: '/components/breadcrumbs',
  button: '/components/button',
  checkbox: '/components/checkbox',
  'clipboard-text': '/components/clipboard-text',
  code: '/components/code',
  collapsible: '/components/collapsible',
  combobox: '/components/combobox',
  'command-palette': '/components/command-palette',
  'date-range-picker': '/components/date-range-picker',
  dialog: '/components/dialog',
  dropdown: '/components/dropdown',
  empty: '/components/empty',
  grid: '/components/grid',
  input: '/components/input',
  'input-area': '/components/input',
  label: '/components/label',
  'layer-card': '/components/layer-card',
  loader: '/components/loader',
  menubar: '/components/menubar',
  meter: '/components/meter',
  pagination: '/components/pagination',
  popover: '/components/popover',
  radio: '/components/radio',
  select: '/components/select',
  'sensitive-input': '/components/sensitive-input',
  'skeleton-line': '/components/skeleton-line',
  surface: '/components/surface',
  switch: '/components/switch',
  table: '/components/table',
  tabs: '/components/tabs',
  text: '/components/text',
  toast: '/components/toast',
  tooltip: '/components/tooltip',
};
const routeOf = (id: string) => componentRoutes[id];
const switchToggled = ref(true);
const setSwitchToggled = (value: boolean) => { switchToggled.value = value; };
const checked = ref(true);
const setChecked = (value: boolean) => { checked.value = value; };
const paginationPage = ref(1);
const setPaginationPage = (page: number) => { paginationPage.value = page; };

const selectLabels: Record<string, string> = {
  all: 'All deployed versions',
  active: 'Active versions',
  specific: 'Specific versions',
};
const renderSelectValue = (value: unknown) => value ? selectLabels[String(value)] : undefined;
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
  { id: 'bold', icon: 'B', onClick: () => {}, tooltip: 'Bold' },
  { id: 'italic', icon: 'I', onClick: () => {}, tooltip: 'Italic' },
];
const ignoreDateChange = () => {};
</script>

<template>
  <ul class="grid auto-rows-min grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
    <li class="relative flex aspect-square items-center justify-center bg-kumo-elevated ring-1 ring-kumo-line">
      <a :href="routeOf('button')" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Button</a>
      <div class="grid gap-3">
        <Button>
          <template #icon><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path></svg></template>
          Create Worker
        </Button>
        <Button variant="primary">
          <template #icon><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path></svg></template>
          Create Worker
        </Button>
        <Button :loading="true">Create Worker</Button>
      </div>
    </li>

    <li class="relative flex aspect-square items-center justify-center bg-kumo-elevated ring-1 ring-kumo-line">
      <a :href="routeOf('input')" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Input</a>
      <div class="grid gap-3">
        <Input placeholder="Type something..." />
        <Input variant="error" value="Invalid!" />
      </div>
    </li>

    <li class="relative flex aspect-square items-center justify-center bg-kumo-elevated ring-1 ring-kumo-line">
      <a :href="routeOf('select')" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Select</a>
      <Select class="w-[200px]" :render-value="renderSelectValue" :fixture="selectFixture" />
    </li>

    <li class="relative flex aspect-square items-center justify-center bg-kumo-elevated ring-1 ring-kumo-line">
      <a :href="routeOf('combobox')" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Combobox</a>
      <Combobox :fixture="comboboxFixture" />
    </li>

    <li class="relative flex aspect-square items-center justify-center bg-kumo-elevated ring-1 ring-kumo-line">
      <a :href="routeOf('switch')" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Switch</a>
      <Switch :checked="switchToggled" :on-checked-change="setSwitchToggled" />
    </li>

    <li class="relative flex aspect-square items-center justify-center bg-kumo-elevated ring-1 ring-kumo-line">
      <a :href="routeOf('input')" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Input (with validation)</a>
      <Input label="Email" placeholder="name@example.com" type="email" variant="error" :error="{ message: 'Please enter a valid email.', match: 'typeMismatch' }" description="The email to send notifications to." />
    </li>

    <li class="relative flex aspect-square items-center justify-center bg-kumo-elevated ring-1 ring-kumo-line">
      <a :href="routeOf('dialog')" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Dialog</a>
      <Dialog :fixture="dialogFixture" />
    </li>

    <li class="relative flex aspect-square items-center justify-center bg-kumo-elevated ring-1 ring-kumo-line">
      <a :href="routeOf('tooltip')" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Tooltip</a>
      <div class="flex gap-2">
        <Tooltip content="Add" open><Button shape="square">Add</Button></Tooltip>
        <Tooltip content="Change language"><Button shape="square">Translate</Button></Tooltip>
      </div>
    </li>

    <li class="relative flex aspect-square items-center justify-center bg-kumo-elevated ring-1 ring-kumo-line">
      <a :href="routeOf('dropdown')" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Dropdown</a>
      <DropdownMenu :fixture="dropdownFixture" />
    </li>

    <li class="relative flex aspect-square items-center justify-center bg-kumo-elevated ring-1 ring-kumo-line">
      <a :href="routeOf('collapsible')" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Collapsible</a>
      <Collapsible title="What is Kumo?">Kumo is Cloudflare's component library.</Collapsible>
    </li>

    <li class="relative flex aspect-square items-center justify-center bg-kumo-elevated ring-1 ring-kumo-line">
      <a :href="routeOf('checkbox')" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Checkbox</a>
      <Checkbox label="Max bandwidth" :checked="checked" :on-checked-change="setChecked" />
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
      <div class="flex w-[200px] flex-col gap-2">
        <SkeletonLine :min-width="50" :max-width="100" />
        <SkeletonLine :min-width="80" :max-width="100" />
        <SkeletonLine :min-width="30" :max-width="100" />
      </div>
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
        <Banner title="This is a default banner." />
        <Banner title="This is an alert banner." variant="alert" />
        <Banner title="This is an error banner." variant="error" />
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
      <Toasty :toast-manager="toastManager"><Button @click="toastManager.add({ title: 'Toast created', description: 'This is a toast notification.' })">Give me a toast</Button></Toasty>
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
      <div class="scale-90"><DateRangePicker :on-start-date-change="ignoreDateChange" :on-end-date-change="ignoreDateChange" /></div>
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
