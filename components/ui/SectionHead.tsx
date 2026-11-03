import FadeIn from "../motion/FadeIn";

type SectionHeadProps = {
  title: string;
  /** Second headline line, set in the muted accent. */
  titleMuted?: string;
  lead?: string;
  /** Standalone pages render the title as the page's h1. */
  level?: "h1" | "h2";
  aside?: React.ReactNode;
};

/** A two-tone headline with an optional lead and aside. */
export default function SectionHead({
  title,
  titleMuted,
  lead,
  level = "h2",
  aside,
}: SectionHeadProps) {
  const Heading = level;
  return (
    <FadeIn className="sec-head">
      <div className="sec-head-main">
        <Heading className="sec-title">
          {title}
          {titleMuted && (
            <>
              <br />
              <span className="sec-title-muted">{titleMuted}</span>
            </>
          )}
        </Heading>
        {lead && <p className="sec-lead">{lead}</p>}
      </div>
      {aside && <div className="sec-head-aside">{aside}</div>}
    </FadeIn>
  );
}
