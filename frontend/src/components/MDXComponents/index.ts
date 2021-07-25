import {
    CustomPre,
    CustomCode,
    CustomDiv,
    CustomLink,
    InfoQuote,
    ThoughtQuote,
    AnnouncementQuote,
    BlockQuote,
    IdeaQuote,
    WarningQuote,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
} from "./MDXComponents";

const MDXComponents = {
    div: CustomDiv,
    a: CustomLink,
    pre: CustomPre,
    code: CustomCode,
    h1: h1,
    h2: h2,
    h3: h3,
    h4: h4,
    h5: h5,
    h6: h6,
    InfoQuote,
    ThoughtQuote,
    AnnouncementQuote,
    BlockQuote,
    IdeaQuote,
    WarningQuote,
};

export default MDXComponents;