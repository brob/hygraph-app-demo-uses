import { useApp, useFormSidebarExtension, Wrapper } from "@graphcms/app-sdk-react";
import QRCode from "react-qr-code";
import {useEffect, useRef, useState} from "react";

function SidebarElement() {
    const { installation, extension } = useFormSidebarExtension();
    const { form } = useApp()
    const [slug, setSlug] = useState('');
    const svgElement = useRef(null)
    
    useEffect(() => {
        form.subscribeToFieldState(extension.sidebarConfig.SLUG_FIELD, (fieldState) => {
            setSlug(fieldState.value)
        })
    }, [])
    
    const handleClick = (e) => {
        //get svg source.
        var serializer = new XMLSerializer();
        var source = serializer.serializeToString(svgElement.current);

        //add name spaces.
        if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
            source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
        }
        if(!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
            source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
        }

        //add xml declaration
        source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

        //convert svg source to URI data scheme.
        var url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);

        //set url value to a element's href attribute.
        e.target.href = url;
    }

    const fullUrl = `${installation.config.url}/${slug}`;
    return (<>
            <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={fullUrl}
                viewBox={`0 0 256 256`}
                ref={svgElement}
            />
            <a href="#" download="qr.svg" onClick={handleClick}>Download QR Code</a>
</>    );
}

export default function Sidebar() {
    return (
        <Wrapper>
            <SidebarElement />
        </Wrapper>
    );
}
