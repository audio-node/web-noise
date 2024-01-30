import { useNode, useTheme } from "@web-noise/core";
import styled from "@emotion/styled";
import { FaRegArrowAltCircleRight as SetUrlIcon } from "react-icons/fa";
import Input from "../components/Input";
import Button from "../components/Button";
import {
  ConfigPanel,
  ConfigRow,
  ConfigRowControl,
  ConfigRowLabel,
  ConfigRowSeparator,
} from "../components/NodeConfig";
import { ConvolverProps } from "./types";

const UrlForm = styled.form`
  display: flex;
  gap: 0.5rem;
`;

const ConvolverConfig = ({ id, data }: ConvolverProps) => {
  const theme = useTheme();
  const { updateNodeValues, updateNodeConfig } = useNode(id);

  const { config = {}, values = {} } = data;

  return (
    <ConfigPanel theme={theme}>
      <ConfigRow oneLineLabels theme={theme}>
        <UrlForm
          onSubmit={(event) => {
            const formData = new FormData(event.target as HTMLFormElement);
            updateNodeValues({ url: formData.get("url") });
            event.preventDefault();
          }}
        >
          <Input
            inputProps={{
              placeholder: "url",
              name: "url",
              type: "url",
              defaultValue: values.url,
            }}
            // value={values.url}
          />
          <Button type="submit" theme={theme}>
            <SetUrlIcon />
          </Button>
        </UrlForm>
      </ConfigRow>
    </ConfigPanel>
  );
};

export default ConvolverConfig;
