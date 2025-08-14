import { useState, useRef, useEffect } from 'react';
import { BsThreeDots } from "react-icons/bs";
import "./styles/App.css";

type CardProps = {
  text: string;
  indicatorValue?: number;
};

const TextCard = ({ text, indicatorValue = 1 }: CardProps) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isSingleLine, setIsSingleLine] = useState(false);
  
  useEffect(() => {
    const checkLines = () => {
      if (textRef.current) {
        const lineHeight = parseInt(getComputedStyle(textRef.current).lineHeight, 10) || 24;
        const height = textRef.current.clientHeight;
        setIsSingleLine(height <= lineHeight * 1.5);
      }
    };

    checkLines();
    const observer = new ResizeObserver(checkLines);
    if (textRef.current) observer.observe(textRef.current);
    
    return () => observer.disconnect();
  }, [text]);
  
  return (
    <div className={`text-card ${isSingleLine ? 'single-line' : ''}`}>
      <button className="menu-dots">
        <BsThreeDots className="bs"/>
      </button>
      <p ref={textRef}>{text}</p>
      {indicatorValue !== 0 && (
        <button className={`indicator ${indicatorValue > 0 ? 'active' : ''}`}>
          {Math.abs(indicatorValue)}
        </button>
      )}
    </div>
  );
};

const TextWithImageBlock = ({ text, indicatorValue = 1 }: CardProps) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [alignment, setAlignment] = useState<'center' | 'flex-start'>('center');

  useEffect(() => {
    const checkAlignment = () => {
      if (textRef.current) {
        const lineHeight = parseInt(getComputedStyle(textRef.current).lineHeight, 10) || 24;
        const height = textRef.current.clientHeight;
        setAlignment(height > lineHeight * 2 ? 'flex-start' : 'center');
      }
    };

    checkAlignment();
    const observer = new ResizeObserver(checkAlignment);
    if (textRef.current) observer.observe(textRef.current);
    
    return () => observer.disconnect();
  }, [text]);

  return (
    <div className="image-text-card" style={{ alignItems: alignment }}>
      <div className="text-content">
        <button className="menu-dots">
          <BsThreeDots className="bs" />
        </button>
        <div className="asd">
          <img src="a4989700c519ce886523f0185b0c77105648b279.jpg" alt="Иллюстрация" />
          <p ref={textRef}>{text}</p>
        </div>
        {indicatorValue !== 0 && (
          <button className={`indicator ${indicatorValue > 0 ? 'active' : ''}`}>
            {Math.abs(indicatorValue)}
          </button>
        )}
      </div>
    </div>
  );
};

const PictureCard = ({ text, indicatorValue = 1, reverse = false, blurIndicator = false }: CardProps & { reverse?: boolean, blurIndicator?: boolean }) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [alignment, setAlignment] = useState<'center' | 'flex-start'>('center');

  useEffect(() => {
    const checkAlignment = () => {
      if (textRef.current) {
        const lineHeight = parseInt(getComputedStyle(textRef.current).lineHeight, 10) || 24;
        const height = textRef.current.clientHeight;
        setAlignment(height > lineHeight * 2 ? 'flex-start' : 'center');
      }
    };

    checkAlignment();
    const observer = new ResizeObserver(checkAlignment);
    if (textRef.current) observer.observe(textRef.current);
    
    return () => observer.disconnect();
  }, [text]);
  
  return (
    <div className="picture-card">
      {!reverse && (
        <img
          src="278a6ae038bb6ade654115eda25da9a94265964f.jpg"
          alt="Picture"
        />
      )}
      <div className="text-content" style={{ alignItems: alignment }}>
        <p ref={textRef}>{text}</p>
      </div>
      {reverse && (
        <img
          src="98e3884d016edc047e8384431ccd3799dd68570b.jpg"
          alt="Picture"
        />
      )}
      <button className="menu-dots">
        <BsThreeDots className="bs"/>
      </button>
      {indicatorValue !== 0 && (
        <button className={`indicator ${indicatorValue > 0 ? 'active' : ''}`}>
          {Math.abs(indicatorValue)}
        </button>
      )}
      {indicatorValue !== 0 && (
        <button 
          className={`indicator ${indicatorValue > 0 ? 'active' : ''} ${blurIndicator ? 'blurred' : ''}`}
        >
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

  return (
    <>
    <div className="wrapper-app">
      <div className="text-section">
        {Array(4).fill(0).map((_, idx) => (
          <TextCard 
            key={`text-${idx}`} 
            text={testText} 
            indicatorValue={indicatorValue}
          />
        ))}
      </div>

      <div className="image-text-section">
        {Array(4).fill(0).map((_, idx) => (
          <TextWithImageBlock 
            key={`img-text-${idx}`} 
            text={testText} 
            indicatorValue={indicatorValue}
          />
        ))}
      </div>

      <div className="picture-block">
        <PictureCard text={testText} indicatorValue={indicatorValue} />
        <PictureCard text={testText} indicatorValue={indicatorValue} reverse/>
      </div>
    </div>
    <div className="settings">
        <div className="settings-panel">
          <label>
            Text:
            <textarea 
              value={testText} 
              onChange={(e) => setTestText(e.target.value)} 
              className="settings-textarea"
            />
          </label>
          <label>
            Indicator:
            <input
              type="number"
              value={indicatorValue}
              onChange={handleIndicatorChange}
              style={{ width: "100%", padding: "8px", marginTop: "8px", boxSizing: "border-box" }}
            />
          </label>
        </div>
      </div>
    </>
  );
};

export default App;