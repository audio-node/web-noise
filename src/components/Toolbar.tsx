import { FC, useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useModule, useNode } from "../ModuleContext";
import { Clock } from "../nodes";

const ToolbarWrapper = styled.div`
  background: #181c20;
  padding: 1rem 1rem;
  position: absolute;
  top: 0;
  z-index: 1000;
  width: 100%;
  display: flex;
  color: #8c92a4;
  font-family: ui-monospace, SFMono-Regular, Menlo, "Roboto Mono", monospace;
`;

const Tempo = styled.input`
  background-color: #373c4b;
  border: none;
  border-radius: 3px;
  width: 3rem;
  padding: 0.25rem;
  color: inherit;
`;

const Toolbar: FC = () => {
  const { clock: clockNode } = useModule();
  const [clock, setClock] = useState<Clock>();
  const [ready, setReady] = useState(false);
  const [value, setValue] = useState(70);
  const [isPlaying, setPlaying] = useState(false);

  useEffect(() => {
    clockNode?.then((result: Clock) => {
      setClock(result);
      setReady(true);
    });
  }, [clockNode]);

  useEffect(() => {
    clock?.setTempo(value);
  }, [value, clock]);

  const setBpm = useCallback(({ target: { value } }) => {
    setValue(+value);
  }, []);

  const togglePlaying = useCallback(() => {
    if (!clock) {
      return;
    }
    if (isPlaying) {
      clock.stop();
    } else {
      clock.start();
    }
    setPlaying(!isPlaying);
  }, [clock, setPlaying, isPlaying]);

  return (
    <ToolbarWrapper>
      {!ready ? (
        <div>loading</div>
      ) : (
        <div>
          <button onClick={togglePlaying}>
            {isPlaying ? "stop" : "start"}
          </button>
          <label>
            bpm: <Tempo type="number" value={value} onChange={setBpm} />
          </label>
        </div>
      )}
    </ToolbarWrapper>
  );
};

export default Toolbar;
