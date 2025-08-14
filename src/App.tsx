import "./styles/App.css";
import { BsThreeDots } from "react-icons/bs";
import { useRef, useEffect, useState } from "react";

type CardProps = {
  text: string;
  indicatorValue?: number;
  reverse?: boolean;
};

const TextCard = ({ text, indicatorValue = 1 }: CardProps) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const indicatorRef = useRef<HTMLButtonElement>(null);
  const measureRef = useRef<HTMLParagraphElement>(null);
  const [isSingleLine, setIsSingleLine] = useState(false);
  const [needsExtraLine, setNeedsExtraLine] = useState(false);
  const [lineHeight, setLineHeight] = useState(24);

  useEffect(() => {
    const handleCheck = () => {
      if (textRef.current && measureRef.current && (indicatorValue === 0 || indicatorRef.current)) {
        const textEl = textRef.current;
        const measureEl = measureRef.current;
        const style = getComputedStyle(textEl);
        const lh = parseFloat(style.lineHeight) || 24;
        setLineHeight(lh);
        const origHeight = textEl.clientHeight;
        const numLines = Math.round(origHeight / lh);
        let overflow = false;

        if (indicatorValue !== 0 && indicatorRef.current) {
          const indW = indicatorRef.current.offsetWidth + 8;
          measureEl.style.width = style.width;
          measureEl.style.lineHeight = style.lineHeight;
          measureEl.style.font = style.font;
          measureEl.style.overflowWrap = style.overflowWrap;
          measureEl.style.padding = '0';
          measureEl.style.margin = '0';
          measureEl.textContent = text;
          const span = document.createElement('span');
          span.style.display = 'inline-block';
          span.style.width = `${indW}px`;
          span.style.height = '1px';
          measureEl.appendChild(span);
          const measureHeight = measureEl.clientHeight;
          overflow = measureHeight > origHeight;
          span.remove();
        }

        setNeedsExtraLine(overflow);
        const effectiveSingle = numLines === 1 && !overflow;
        setIsSingleLine(effectiveSingle);
      }
    };

    handleCheck();
    const observer = new ResizeObserver(handleCheck);
    if (textRef.current) observer.observe(textRef.current);
    return () => observer.disconnect();
  }, [text, indicatorValue]);

  return (
    <div className={`text-card ${isSingleLine ? 'single-line' : 'multi-line'}`}>
      <button className="menu-dots">
        <BsThreeDots className="bs"/>
      </button>
      <p ref={textRef}>{text}</p>
      {needsExtraLine && <div style={{ height: `${lineHeight}px` }} />}
      {indicatorValue !== 0 && (
        <button
          ref={indicatorRef}
          className={`indicator ${indicatorValue > 0 ? 'active' : ''}`}
        >
          {Math.abs(indicatorValue)}
        </button>
      )}
    </div>
  );
};

const TextWithImageBlock = ({ text, indicatorValue = 1 }: { text: string; imageUrl: string; indicatorValue?: number }) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const indicatorRef = useRef<HTMLButtonElement>(null);
  const measureRef = useRef<HTMLParagraphElement>(null);
  const [alignment, setAlignment] = useState<'center' | 'flex-start'>('center');
  const [needsExtraLine, setNeedsExtraLine] = useState(false);
  const [lineHeight, setLineHeight] = useState(24);

  useEffect(() => {
    const handleCheck = () => {
      if (textRef.current && measureRef.current && (indicatorValue === 0 || indicatorRef.current)) {
        const textEl = textRef.current;
        const measureEl = measureRef.current;
        const style = getComputedStyle(textEl);
        const lh = parseFloat(style.lineHeight) || 24;
        setLineHeight(lh);
        const origHeight = textEl.clientHeight;
        const numLines = Math.round(origHeight / lh);
        setAlignment(numLines <= 2 ? 'center' : 'flex-start');
        let overflow = false;

        if (indicatorValue !== 0 && indicatorRef.current) {
          const indW = indicatorRef.current.offsetWidth + 8;
          measureEl.style.width = style.width;
          measureEl.style.lineHeight = style.lineHeight;
          measureEl.style.font = style.font;
          measureEl.style.overflowWrap = style.overflowWrap;
          measureEl.style.padding = '0';
          measureEl.style.margin = '0';
          measureEl.textContent = text;
          const span = document.createElement('span');
          span.style.display = 'inline-block';
          span.style.width = `${indW}px`;
          span.style.height = '1px';
          measureEl.appendChild(span);
          const measureHeight = measureEl.clientHeight;
          overflow = measureHeight > origHeight;
          span.remove();
        }

        setNeedsExtraLine(overflow);
      }
    };

    handleCheck();
    const observer = new ResizeObserver(handleCheck);
    if (textRef.current) observer.observe(textRef.current);
    return () => observer.disconnect();
  }, [text, indicatorValue]);

  return (
    <div className="image-text-card" style={{ alignItems: alignment }}>
      <div className="text-content">
        <button className="menu-dots">
          <BsThreeDots className="bs" />
        </button>
        <div className="asd">
          <img src="/y300.webp" alt="Иллюстрация" />
          <p ref={textRef}>{text}</p>
        </div>
        {needsExtraLine && <div style={{ height: `${lineHeight}px` }} />}
        {indicatorValue !== 0 && (
          <button
            ref={indicatorRef}
            className={`indicator ${indicatorValue > 0 ? 'active' : ''}`}
          >
            {Math.abs(indicatorValue)}
          </button>
        )}
        <p ref={measureRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
};

const PictureCard = ({ text, indicatorValue = 1 }: CardProps) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [alignment, setAlignment] = useState<'center' | 'flex-start'>('center');

  useEffect(() => {
    if (textRef.current) {
      const checkAlignment = () => {
        const element = textRef.current!;
        const style = getComputedStyle(element);
        const lineHeight = parseInt(style.lineHeight, 10) || 24;
        const height = element.clientHeight;
        setAlignment(height > lineHeight * 2.5 ? 'flex-start' : 'center');
      };

      checkAlignment();
      const observer = new ResizeObserver(checkAlignment);
      observer.observe(textRef.current);
      return () => observer.disconnect();
    }
  }, [text]);

  return (
    <div className="picture-card">
      <img
        src="https://i.pinimg.com/736x/83/9a/cb/839acb672adb9d908888f435c6244c3f.jpg"
        alt="Picture"
      />
      <button className="menu-dots">
        <BsThreeDots className="bs"/>
      </button>
      {indicatorValue !== 0 && (
        <button className={`indicator ${indicatorValue > 0 ? 'active' : ''}`}>
          {Math.abs(indicatorValue)}
        </button>
      )}
      <div className="text-content" style={{ alignItems: alignment }}>
        <p ref={textRef}>{text}</p>
      </div>
    </div>
  );
};

const PictureCardReverse = ({ text, indicatorValue = 1 }: CardProps) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [alignment, setAlignment] = useState<'center' | 'flex-start'>('center');

  useEffect(() => {
    if (textRef.current) {
      const checkAlignment = () => {
        const element = textRef.current!;
        const style = getComputedStyle(element);
        const lineHeight = parseInt(style.lineHeight, 10) || 24;
        const height = element.clientHeight;
        setAlignment(height > lineHeight * 2.5 ? 'flex-start' : 'center');
      };

      checkAlignment();
      const observer = new ResizeObserver(checkAlignment);
      observer.observe(textRef.current);
      return () => observer.disconnect();
    }
  }, [text]);

  return (
    <div className="picture-card">
      <div className="text-content" style={{ alignItems: alignment }}>
        <p ref={textRef}>{text}</p>
      </div>
      <img
        src="https://i.pinimg.com/736x/83/9a/cb/839acb672adb9d908888f435c6244c3f.jpg"
        alt="Picture"
      />
      <button className="menu-dots">
        <BsThreeDots className="bs"/>
      </button>
      {indicatorValue !== 0 && (
        <button className={`indicator ${indicatorValue > 0 ? 'active' : ''}`}>
          {Math.abs(indicatorValue)}
        </button>
      )}
    </div>
  );
};

const App = () => {
  const [testText, setTestText] = useState("Drinking water isn't just about quenching your thirst. It plays a crucial role in maintaining the proper functioning of your body.");
  const [indicatorValue, setIndicatorValue] = useState(10);

  const handleIndicatorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(e.target.value, 10) || 0;
    setIndicatorValue(Math.max(-9999, Math.min(9999, num)));
  };

  const textItems = Array(4).fill(testText);
  const imageTextItems = Array(4).fill("quenching your thirst. It plays a crucial role in maintaining the proper functioning of your body.");
  
  return (
    <div className="wrapper-app">
      <div className="text-section">
        {textItems.map((_, idx) => (
          <TextCard 
            key={`text-${idx}`} 
            text={testText} 
            indicatorValue={indicatorValue}
          />
        ))}
      </div>

      <div className="image-text-section">
        {imageTextItems.map((_, idx) => (
          <TextWithImageBlock 
            key={`img-text-${idx}`} 
            text={testText} 
            imageUrl="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
            indicatorValue={indicatorValue}
          />
        ))}
      </div>

      <div className="picture-block">
        <PictureCard 
          text={testText}
          indicatorValue={indicatorValue} 
        />
        <PictureCardReverse
          text={testText}
          indicatorValue={indicatorValue} />
      </div>

      <div className="settings">
        <div className="settings-panel">
          <label>
            Tekst:
            <textarea value={testText} onChange={(e) => setTestText(e.target.value) } className="settings-textarea" id="">{testText}</textarea>
            Indicator:
            <input
              type="number"
              value={indicatorValue}
              onChange={handleIndicatorChange}
              style={{ width: "100%", padding: "6px", marginTop: "8px" }}
            />
          </label>
        </div>
      </div>
    </div>
  );
};
export default App