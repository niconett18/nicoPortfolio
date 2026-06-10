"use client";

import React, { useRef } from "react";
import { MotionValue, motion, useScroll, useTransform } from "framer-motion";

type ContainerScrollProps = {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
  cardClassName?: string;
  contentClassName?: string;
};

export const ContainerScroll = ({
  titleComponent,
  children,
  className = "",
  headerClassName = "",
  cardClassName = "",
  contentClassName = "",
}: ContainerScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const rotate = useTransform(scrollYProgress, [0, 0.52, 1], isMobile ? [0, 0, 0] : [8, 0, -2]);
  const scale = useTransform(scrollYProgress, [0, 0.52, 1], isMobile ? [0.96, 1, 0.99] : [1.018, 1, 0.985]);
  const translate = useTransform(scrollYProgress, [0, 0.52, 1], isMobile ? [6, 0, -8] : [22, 0, -34]);

  return (
    <section className={`container-scroll-shell ${className}`} ref={containerRef}>
      <div className="container-scroll-stage" style={{ perspective: "1200px" }}>
        <Header translate={translate} titleComponent={titleComponent} className={headerClassName} />
        <Card
          rotate={rotate}
          scale={scale}
          className={cardClassName}
          contentClassName={contentClassName}
        >
          {children}
        </Card>
      </div>
    </section>
  );
};

export const Header = ({
  translate,
  titleComponent,
  className = "",
}: {
  translate: MotionValue<number>;
  titleComponent: string | React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div style={{ translateY: translate }} className={`container-scroll-header ${className}`}>
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
  className = "",
  contentClassName = "",
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        transformStyle: "preserve-3d",
      }}
      className={`container-scroll-card ${className}`}
    >
      <div className={`container-scroll-content ${contentClassName}`}>{children}</div>
    </motion.div>
  );
};
