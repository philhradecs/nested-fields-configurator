import { MantineProvider } from "@mantine/core";
import { RuleBuilder } from "./components/rule-builder";

function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        globalStyles: theme => ({
          html: { scrollbarGutter: "stable both-edges" }
        }),
        colorScheme: "dark",
        components: {
          Button: { defaultProps: { radius: "xs", color: "indigo" } },
          Paper: { defaultProps: { radius: "sm" } }
        }
      }}
    >
      <RuleBuilder />
    </MantineProvider>
  );
}

export default App;
