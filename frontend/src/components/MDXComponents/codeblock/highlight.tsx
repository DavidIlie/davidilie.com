import BaseHighlight, { defaultProps } from "prism-react-renderer";
import { useTheme } from "next-themes";
import { prismDark, prismLight } from "./themes";

function Highlight({ codeString, language, showLines }) {
    const { resolvedTheme } = useTheme();

    const baseTheme = resolvedTheme === "light" ? prismLight : prismDark;

    const customTheme = {
        ...baseTheme,
        plain: {
            fontSize: "14px",
            lineHeight: "12px",
        },
    };

    return (
        <BaseHighlight
            {...defaultProps}
            code={codeString}
            language={language}
            //@ts-ignore
            theme={customTheme}
        >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <div className="pb-4 overflow-x-auto">
                    <pre className={className} style={style}>
                        {tokens.splice(0, tokens.length - 1).map((line, i) => {
                            const lineProps = getLineProps({
                                line,
                                key: i,
                            });
                            return (
                                <div {...lineProps} key={i}>
                                    {showLines && (
                                        <span className="px-4 select-none text-md">
                                            {i + 1}
                                        </span>
                                    )}
                                    {line.map((token, key) => (
                                        <span
                                            {...getTokenProps({
                                                token,
                                                key,
                                            })}
                                            key={key}
                                        />
                                    ))}
                                </div>
                            );
                        })}
                    </pre>
                </div>
            )}
        </BaseHighlight>
    );
}

export default Highlight;
