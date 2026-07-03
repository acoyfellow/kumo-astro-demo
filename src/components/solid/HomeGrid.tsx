// Native SOLID homepage grid matching the canonical kumo-ui.com HomeGrid
// (see /tmp/kumo-golden/HomeGrid.tsx) with the currently exported
// @acoyfellow/kumo-solid components. Interactive compound components consume
// the compiler's native `fixture` contract; unavailable native components are
// called out rather than recreated with local lookalikes.
import {
  Badge, Banner, Button, Checkbox, ClipboardText, Code, Combobox,
  DateRangePicker, Dialog, DropdownMenu, Grid, GridItem, Input, InputArea,
  Label, LayerCard, Loader, MenuBar, Meter, Pagination, Popover, Radio, Select,
  SensitiveInput, Surface, Switch, Table, Tabs, Text, Toasty, createKumoToastManager,
  Tooltip, Collapsible, SkeletonLine,
} from '@acoyfellow/kumo-solid';
import { createSignal, type JSX } from 'solid-js';

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
  { id: 'bold', icon: <strong>B</strong>, onClick: () => {}, tooltip: 'Bold' },
  { id: 'italic', icon: <em>I</em>, onClick: () => {}, tooltip: 'Italic' },
];

function Cell(props: { name: string; id: string; children: JSX.Element }) {
  return (
    <li class="relative flex aspect-square items-center justify-center bg-kumo-elevated ring-1 ring-kumo-line">
      <a href={componentRoutes[props.id]} class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">{props.name}</a>
      {props.children}
    </li>
  );
}

function Unavailable(): JSX.Element {
  return <span class="text-xs text-kumo-inactive italic">not exported by @acoyfellow/kumo-solid</span>;
}

export function HomeGrid(): JSX.Element {
  const [switchToggled, setSwitchToggled] = createSignal(true);
  const [checked, setChecked] = createSignal(true);
  const [paginationPage, setPaginationPage] = createSignal(1);
  const toastManager = createKumoToastManager();

  return (
    <ul class="grid auto-rows-min grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      <Cell name="Button" id="button">
        <div class="grid gap-3">
          <Button icon={<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path></svg>}>Create Worker</Button>
          <Button variant="primary" icon={<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path></svg>}>Create Worker</Button>
          <Button loading>Create Worker</Button>
        </div>
      </Cell>

      <Cell name="Input" id="input">
        <div class="grid gap-3">
          <Input placeholder="Type something..." />
          <Input variant="error" value="Invalid!" />
        </div>
      </Cell>

      <Cell name="Select" id="select">
        <Select placeholder="Select a version..." fixture={selectFixture} />
      </Cell>

      <Cell name="Combobox" id="combobox">
        <Combobox fixture={comboboxFixture} />
      </Cell>

      <Cell name="Switch" id="switch">
        <Switch checked={switchToggled()} onCheckedChange={setSwitchToggled} />
      </Cell>

      <Cell name="Input (with validation)" id="input">
        <Input label="Email" placeholder="name@example.com" type="email" aria-invalid="true" />
      </Cell>

      <Cell name="Dialog" id="dialog">
        <Dialog fixture={dialogFixture} />
      </Cell>

      <Cell name="Tooltip" id="tooltip">
        <div class="flex gap-2">
          <Tooltip content="Add" open><Button shape="square">Add</Button></Tooltip>
          <Tooltip content="Change language"><Button shape="square">Translate</Button></Tooltip>
        </div>
      </Cell>

      <Cell name="Dropdown" id="dropdown">
        <DropdownMenu open fixture={dropdownFixture} />
      </Cell>

      <Cell name="Collapsible" id="collapsible">
        <Collapsible title="What is Kumo?">Kumo is Cloudflare's component library.</Collapsible>
      </Cell>

      <Cell name="Checkbox" id="checkbox">
        <Checkbox label="Max bandwidth" checked={checked()} onCheckedChange={setChecked} />
      </Cell>

      <Cell name="LayerCard" id="layer-card">
        <LayerCard className="w-[200px]">
          <LayerCard.Secondary>Next Steps</LayerCard.Secondary>
          <LayerCard.Primary>Hello</LayerCard.Primary>
        </LayerCard>
      </Cell>

      <Cell name="Loader" id="loader">
        <Loader />
      </Cell>

      <Cell name="SkeletonLine" id="skeleton-line">
        <div class="flex w-[200px] flex-col gap-2">
          <SkeletonLine minWidth={50} maxWidth={100} />
          <SkeletonLine minWidth={80} maxWidth={100} />
          <SkeletonLine minWidth={30} maxWidth={100} />
        </div>
      </Cell>

      <Cell name="Surface" id="surface">
        <Surface className="flex h-24 w-40 items-center justify-center rounded-lg bg-kumo-base text-sm text-kumo-subtle"><em>To put things over.</em></Surface>
      </Cell>

      <Cell name="Code" id="code">
        <Code lang="ts" code={'const a = callMyFunction("hello")'} />
      </Cell>

      <Cell name="Banner" id="banner">
        <div class="flex flex-col gap-2">
          <Banner title="This is a default banner." />
          <Banner title="This is an alert banner." variant="alert" />
          <Banner title="This is an error banner." variant="error" />
        </div>
      </Cell>

      <Cell name="Tabs" id="tabs">
        <Tabs tabs={tabs} />
      </Cell>

      <Cell name="Badge" id="badge">
        <div class="flex flex-col gap-2">
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="beta">Beta</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </Cell>

      <Cell name="Toast" id="toast">
        <Toasty toastManager={toastManager}><Button onClick={() => toastManager.add({ title: 'Toast created', description: 'This is a toast notification.' })}>Give me a toast</Button></Toasty>
      </Cell>

      <Cell name="Pagination" id="pagination">
        <Pagination page={paginationPage()} perPage={10} totalCount={100} setPage={setPaginationPage} />
      </Cell>

      <Cell name="InputArea" id="input-area">
        <InputArea placeholder="Enter your name" />
      </Cell>

      <Cell name="Meter" id="meter">
        <div class="w-full px-4"><Meter value={75} label="My meter" customValue="100 / 5,000" /></div>
      </Cell>

      <Cell name="MenuBar" id="menubar">
        <MenuBar isActive={0} options={menuOptions} />
      </Cell>

      <Cell name="DateRangePicker" id="date-range-picker">
        <div class="scale-90"><DateRangePicker onStartChange={() => {}} onEndChange={() => {}} /></div>
      </Cell>

      <Cell name="Breadcrumbs" id="breadcrumbs">
        <div class="flex items-center gap-1 text-sm">
          <span class="text-kumo-subtle">Home</span>
          <span class="text-kumo-inactive">/</span>
          <span class="text-kumo-subtle">Docs</span>
          <span class="text-kumo-inactive">/</span>
          <span class="font-medium">Page</span>
        </div>
      </Cell>

      <Cell name="ClipboardText" id="clipboard-text">
        <ClipboardText text="npx kumo add button" />
      </Cell>

      <Cell name="CommandPalette" id="command-palette">
        <Button>Open Command Palette</Button>
      </Cell>

      <Cell name="Empty" id="empty">
        <div class="flex flex-col items-center gap-1 text-center">
          <span class="text-sm font-medium">No results</span>
          <span class="text-xs text-kumo-subtle">Try a different search</span>
        </div>
      </Cell>

      <Cell name="Grid" id="grid">
        <Grid variant="side-by-side" gap="sm" className="w-[140px]">
          <GridItem className="rounded bg-kumo-control p-3 text-center text-xs">1</GridItem>
          <GridItem className="rounded bg-kumo-control p-3 text-center text-xs">2</GridItem>
          <GridItem className="rounded bg-kumo-control p-3 text-center text-xs">3</GridItem>
          <GridItem className="rounded bg-kumo-control p-3 text-center text-xs">4</GridItem>
        </Grid>
      </Cell>

      <Cell name="Label" id="label">
        <div class="flex flex-col gap-2">
          <Label>Default Label</Label>
          <Label showOptional>Optional Field</Label>
          <Label tooltip="More info">With Tooltip</Label>
        </div>
      </Cell>

      <Cell name="Popover" id="popover">
        <Popover fixture={popoverFixture} />
      </Cell>

      <Cell name="Radio" id="radio">
        <Radio fixture={radioFixture} />
      </Cell>

      <Cell name="SensitiveInput" id="sensitive-input">
        <SensitiveInput defaultValue="super-secret-api-key" />
      </Cell>

      <Cell name="Table" id="table">
        <Table className="w-[200px] text-sm">
          <Table.Header>
            <Table.Row>
              <Table.Head>Name</Table.Head>
              <Table.Head>Status</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row><Table.Cell>Worker 1</Table.Cell><Table.Cell>Active</Table.Cell></Table.Row>
            <Table.Row><Table.Cell>Worker 2</Table.Cell><Table.Cell>Paused</Table.Cell></Table.Row>
            <Table.Row><Table.Cell>Worker 3</Table.Cell><Table.Cell>Active</Table.Cell></Table.Row>
          </Table.Body>
        </Table>
      </Cell>

      <Cell name="Text" id="text">
        <div class="flex flex-col gap-1">
          <Text size="lg" bold>Large Bold Text</Text>
          <Text size="base">Regular text content</Text>
          <Text size="sm">Small subtle text</Text>
        </div>
      </Cell>
    </ul>
  );
}

export default HomeGrid;
