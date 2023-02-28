import { useApp, Wrapper } from "@graphcms/app-sdk-react";
import { Box, Button, Text, Heading, Stack, Input, Label } from "@hygraph/baukasten";
import { useState } from "react";
function SetupElement() {
    const { installation } = useApp();
    if (installation.status === "COMPLETED") {
        return <Configure />;
    }
    return <Install />;
}

function Install() {
    const { updateInstallation } = useApp();
    const [url, setUrl] = useState("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
    }
    return (
        <Stack gap="12">
            <Box>
                <Heading>Hygraph Boilerplate App</Heading>
                <Text>This is an example app</Text>
                <Label htmlFor="url">URL</Label>
                <Input label="URL" name="url" value={url} onChange={handleChange} />
                <Button
                    onClick={() =>
                        updateInstallation({ status: "COMPLETED", config: {
                            url
                        } })
                    }
                >
                    Install App
                </Button>
            </Box>
        </Stack>
    );
}

function Configure() {
    const { updateInstallation, installation } = useApp();
    const [url, setUrl] = useState(installation.config.url || '');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
    }
    return (
        <Stack gap="12">
            <Box>
                <Heading>Hygraph Boilerplate App</Heading>
                <Text>This is an example app</Text>
                <Label htmlFor="url">URL</Label>
                <Input label="URL" name="url" value={url} onChange={handleChange} />
                <Button
                    onClick={() =>
                        updateInstallation({ status: "COMPLETED", config: {
                            url
                        } })
                    }
                >
                    Save
                </Button>
            </Box>
        </Stack>
    );
}

export default function Setup() {
    return (
        <Wrapper>
            <SetupElement />
        </Wrapper>
    );
}
