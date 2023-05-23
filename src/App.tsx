import { MantineProvider } from "@mantine/core";
import { FormFieldsConfigurator } from "./components/form-fields-configurator";

function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        globalStyles: (theme) => ({
          html: { scrollbarGutter: "stable both-edges" },
        }),
        colorScheme: "dark",
        components: {
          Button: { defaultProps: { radius: "xs", color: "indigo" } },
          Paper: { defaultProps: { radius: "sm" } },
        },
      }}
    >
      <FormFieldsConfigurator />
    </MantineProvider>
  );
}

export default App;
