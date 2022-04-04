import { FC, useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useModule, useNode } from "../ModuleContext";
import { getClock, Clock } from "../nodes";

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
  const { audioContext, registerNode } = useModule();
  registerNode("application-clock", getClock(audioContext));
  const { node } = useNode<Promise<Clock>>("application-clock");
  const [clock, setClock] = useState<Clock>();
  const [ready, setReady] = useState(false);
  const [value, setValue] = useState(70);

  useEffect(() => {
    node?.then((result: Clock) => {
      setClock(result);
      setReady(true);
    });
  }, [node]);

  useEffect(() => {
    clock?.setTempo(value);
  }, [value, clock]);

  const setBpm = useCallback(({ target: { value } }) => {
    setValue(+value);
  }, []);

  return (
    <ToolbarWrapper>
      {!ready ? (
        <div>loading</div>
      ) : (
        <label>
          bpm: <Tempo type="number" value={value} onChange={setBpm} />
        </label>
      )}
    </ToolbarWrapper>
  );
};

export default Toolbar;
