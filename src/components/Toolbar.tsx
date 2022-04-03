import { FC, useCallback, useEffect, useState } from "react";
import { useModule, useNode } from "../ModuleContext";
import { getClock, Clock } from "../nodes";

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
    console.log(45645646456456, value);
    clock?.setTempo(value);
  }, [value, clock]);

  const setBpm = useCallback(({ target: { value } }) => {
    setValue(+value);
  }, []);

  return (
    <div>
      <label>
        bpm: <input type="number" value={value} onChange={setBpm} />
      </label>
      {!ready ? <div>loading</div> : null}
    </div>
  );
};

export default Toolbar;
