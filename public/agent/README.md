# Agent photo

Drop the headshot here as `mehvish-aslam.jpg` (square, ~600×600+ recommended).

Then set it live by passing the path to the avatar, e.g. in `app/(marketing)/about/page.tsx`:

```tsx
<Avatar name={AGENT.name} size={120} src={AGENT.headshot} />
```

`AGENT.headshot` is defined in `lib/constants.ts`. Until a photo is added, a gold initials
avatar ("MA") is shown so the UI is never broken.
