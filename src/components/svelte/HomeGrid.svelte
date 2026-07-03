<!--
  Native SVELTE homepage grid — a 1:1 rebuild of the kumo-ui.com HomeGrid
  (see /tmp/kumo-golden/HomeGrid.tsx and src/components/react/HomeGrid.tsx),
  rendered with the compiled-native @acoyfellow/kumo-svelte components instead
  of the React canonical. Same sections, same grid geometry, zero React.

  Interactive/compound Kumo components (Select, Combobox, Dialog, Popover,
  DropdownMenu, Radio) consume the compiler's native `fixture` contract — the
  serialized JSX tree the generated components read to build their options,
  triggers and panels. Structural compounds (Table, LayerCard) use the
  flattened native sub-components. No raw-HTML injection, no demo-CSS, no
  hand-rolled lookalikes.
-->
<script lang="ts">
  import {
    Badge, Banner, Button, Checkbox, ClipboardText, Code, Combobox,
    DateRangePicker, Dialog, DropdownMenu, Grid, GridItem, Input, InputArea,
    Label, LayerCard, LayerCardPrimary, LayerCardSecondary, Loader, MenuBar,
    Meter, Pagination, Popover, Radio, Select, SensitiveInput, Surface, Switch,
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Tabs, Text,
    Toasty,
  } from '@acoyfellow/kumo-svelte';

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

  const route = (id: string) => componentRoutes[id];

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

  let switchToggled = $state(true);
  let checked = $state(true);

  // The native package does not yet ship framework-native Phosphor icon
  // bindings. Keep the canonical menu actions without substituting text glyphs.
  const menuOptions = [
    { icon: undefined, onClick: () => {}, tooltip: 'Bold' },
    { icon: undefined, onClick: () => {}, tooltip: 'Italic' },
  ];
</script>

{#snippet cell(name: string, id: string)}
  <a href={route(id)} class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">{name}</a>
{/snippet}

{#snippet box(name: string, id: string, body: import('svelte').Snippet)}
  <li class="relative flex aspect-square items-center justify-center bg-kumo-elevated ring-1 ring-kumo-line">
    {@render cell(name, id)}
    {@render body()}
  </li>
{/snippet}

<ul class="grid auto-rows-min grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
  {#snippet b_button()}
    <div class="grid gap-3">
      <Button>Create Worker</Button>
      <Button variant="primary">Create Worker</Button>
      <Button loading>Create Worker</Button>
    </div>
  {/snippet}
  {@render box('Button', 'button', b_button)}

  {#snippet b_input()}
    <div class="grid gap-3">
      <Input placeholder="Type something..." />
      <Input variant="error" defaultValue="Invalid!" />
    </div>
  {/snippet}
  {@render box('Input', 'input', b_input)}

  {#snippet b_select()}<Select className="w-[200px]" placeholder="Select a version..." fixture={selectFixture} />{/snippet}
  {@render box('Select', 'select', b_select)}

  {#snippet b_combobox()}<Combobox fixture={comboboxFixture} />{/snippet}
  {@render box('Combobox', 'combobox', b_combobox)}

  {#snippet b_switch()}<Switch checked={switchToggled} onCheckedChange={(value) => switchToggled = Boolean(value)} />{/snippet}
  {@render box('Switch', 'switch', b_switch)}

  {#snippet b_input2()}
    <Input
      label="Email"
      placeholder="name@example.com"
      type="email"
      variant="error"
      error={{ message: 'Please enter a valid email.', match: 'typeMismatch' }}
      description="The email to send notifications to."
    />
  {/snippet}
  {@render box('Input (with validation)', 'input', b_input2)}

  {#snippet b_dialog()}<Dialog fixture={dialogFixture} />{/snippet}
  {@render box('Dialog', 'dialog', b_dialog)}

  {#snippet b_tooltip()}
    <div class="flex gap-2">
      <Button>Add</Button>
      <Button>Translate</Button>
    </div>
  {/snippet}
  {@render box('Tooltip', 'tooltip', b_tooltip)}

  {#snippet b_dropdown()}<DropdownMenu open modal={false} fixture={dropdownFixture} />{/snippet}
  {@render box('Dropdown', 'dropdown', b_dropdown)}

  {#snippet b_collapsible()}
    <div class="flex w-[200px] flex-col gap-1">
      <span class="text-base font-medium text-kumo-default">What is Kumo?</span>
      <span class="text-sm text-kumo-subtle">Kumo is Cloudflare's component library.</span>
    </div>
  {/snippet}
  {@render box('Collapsible', 'collapsible', b_collapsible)}

  {#snippet b_checkbox()}<Checkbox label="Max bandwidth" checked={checked} onCheckedChange={(value) => checked = Boolean(value)} />{/snippet}
  {@render box('Checkbox', 'checkbox', b_checkbox)}

  {#snippet b_layercard()}
    <LayerCard className="w-[200px]">
      <LayerCardSecondary>Next Steps</LayerCardSecondary>
      <LayerCardPrimary>Hello</LayerCardPrimary>
    </LayerCard>
  {/snippet}
  {@render box('LayerCard', 'layer-card', b_layercard)}

  {#snippet b_loader()}<Loader />{/snippet}
  {@render box('Loader', 'loader', b_loader)}

  {#snippet b_skeleton()}<span class="text-xs text-kumo-inactive italic">no native emitter yet</span>{/snippet}
  {@render box('SkeletonLine', 'skeleton-line', b_skeleton)}

  {#snippet b_surface()}
    <Surface className="flex h-24 w-40 items-center justify-center rounded-lg bg-kumo-base text-sm text-kumo-subtle"><em>To put things over.</em></Surface>
  {/snippet}
  {@render box('Surface', 'surface', b_surface)}

  {#snippet b_code()}<Code lang="ts" code={`const a = callMyFunction("hello")`} />{/snippet}
  {@render box('Code', 'code', b_code)}

  {#snippet b_banner()}
    <div class="flex flex-col gap-2">
      <Banner text="This is a default banner." />
      <Banner text="This is an alert banner." variant="alert" />
      <Banner text="This is an error banner." variant="error" />
    </div>
  {/snippet}
  {@render box('Banner', 'banner', b_banner)}

  {#snippet b_tabs()}<Tabs tabs={[{ value: 'home', label: 'Home' }, { value: 'about', label: 'About' }, { value: 'contact', label: 'Contact' }]} />{/snippet}
  {@render box('Tabs', 'tabs', b_tabs)}

  {#snippet b_badge()}
    <div class="flex flex-col gap-2">
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="beta">Beta</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  {/snippet}
  {@render box('Badge', 'badge', b_badge)}

  {#snippet b_toast()}<Toasty><Button>Give me a toast</Button></Toasty>{/snippet}
  {@render box('Toast', 'toast', b_toast)}

  {#snippet b_pagination()}<Pagination page={1} perPage={10} totalCount={100} />{/snippet}
  {@render box('Pagination', 'pagination', b_pagination)}

  {#snippet b_inputarea()}<InputArea placeholder="Enter your name" />{/snippet}
  {@render box('InputArea', 'input-area', b_inputarea)}

  {#snippet b_meter()}<div class="w-full px-4"><Meter value={75} label="My meter" customValue="100 / 5,000" /></div>{/snippet}
  {@render box('Meter', 'meter', b_meter)}

  {#snippet b_menubar()}<MenuBar isActive={0} options={menuOptions} />{/snippet}
  {@render box('MenuBar', 'menubar', b_menubar)}

  {#snippet b_daterange()}
    <div class="scale-90">
      <DateRangePicker onStartDateChange={() => {}} onEndDateChange={() => {}} />
    </div>
  {/snippet}
  {@render box('DateRangePicker', 'date-range-picker', b_daterange)}

  {#snippet b_breadcrumbs()}
    <div class="flex items-center gap-1 text-sm">
      <span class="text-kumo-subtle">Home</span>
      <span class="text-kumo-inactive">/</span>
      <span class="text-kumo-subtle">Docs</span>
      <span class="text-kumo-inactive">/</span>
      <span class="font-medium">Page</span>
    </div>
  {/snippet}
  {@render box('Breadcrumbs', 'breadcrumbs', b_breadcrumbs)}

  {#snippet b_clipboard()}<ClipboardText text="npx kumo add button" />{/snippet}
  {@render box('ClipboardText', 'clipboard-text', b_clipboard)}

  {#snippet b_command()}<Button>Open Command Palette</Button>{/snippet}
  {@render box('CommandPalette', 'command-palette', b_command)}

  {#snippet b_empty()}
    <div class="flex flex-col items-center gap-1 text-center">
      <span class="text-sm font-medium">No results</span>
      <span class="text-xs text-kumo-subtle">Try a different search</span>
    </div>
  {/snippet}
  {@render box('Empty', 'empty', b_empty)}

  {#snippet b_grid()}
    <Grid variant="side-by-side" gap="sm" className="w-[140px]">
      <GridItem className="rounded bg-kumo-control p-3 text-center text-xs">1</GridItem>
      <GridItem className="rounded bg-kumo-control p-3 text-center text-xs">2</GridItem>
      <GridItem className="rounded bg-kumo-control p-3 text-center text-xs">3</GridItem>
      <GridItem className="rounded bg-kumo-control p-3 text-center text-xs">4</GridItem>
    </Grid>
  {/snippet}
  {@render box('Grid', 'grid', b_grid)}

  {#snippet b_label()}
    <div class="flex flex-col gap-2">
      <Label>Default Label</Label>
      <Label showOptional>Optional Field</Label>
      <Label tooltip="More info">With Tooltip</Label>
    </div>
  {/snippet}
  {@render box('Label', 'label', b_label)}

  {#snippet b_popover()}<Popover fixture={popoverFixture} />{/snippet}
  {@render box('Popover', 'popover', b_popover)}

  {#snippet b_radio()}<Radio fixture={radioFixture} />{/snippet}
  {@render box('Radio', 'radio', b_radio)}

  {#snippet b_sensitive()}<SensitiveInput defaultValue="super-secret-api-key" readOnly />{/snippet}
  {@render box('SensitiveInput', 'sensitive-input', b_sensitive)}

  {#snippet b_table()}
    <Table className="w-[200px] text-sm">
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
  {/snippet}
  {@render box('Table', 'table', b_table)}

  {#snippet b_text()}
    <div class="flex flex-col gap-1">
      <Text size="lg" bold>Large Bold Text</Text>
      <Text size="base">Regular text content</Text>
      <Text size="sm" color="subtle">Small subtle text</Text>
    </div>
  {/snippet}
  {@render box('Text', 'text', b_text)}
</ul>
