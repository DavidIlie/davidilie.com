import { useClipboard } from "@mantine/hooks";
import { Language } from "prism-react-renderer";
import React, { useState } from "react";
import { AiFillCopy } from "react-icons/ai";
import { TiTick } from "react-icons/ti";

import Highlight from "./highlight";

const Codeblock: React.FC<{
   className: string;
   children: string;
   metastring: string;
}> = ({ className, children, metastring }) => {
   const showLines = true;

   const [editorCode] = useState(children);

   const language = className?.replace(/language-/, "") as Language;

   //@ts-ignore
   const title = metastring?.match(/title="(.*?)"/)[1] || "Code Editor";

   const clipboard = useClipboard({ timeout: 2000 });

   return (
      <div className="overflow-hidden bg-white border-2 border-gray-100 rounded-md dark:bg-gray-900 dark:border-gray-800">
         <span className="flex items-center justify-between -mt-2 text-gray-900 border-b-2 border-gray-100 code-title dark:border-gray-800 dark:text-gray-100">
            <span className="mb-1 ml-4 font-sans text-gray-900 dark:text-gray-300 font-sm">
               {title}
            </span>
            <button
               className={`${
                  clipboard.copied
                     ? "bg-green-500 bg-opacity-40 dark:bg-opacity-40 cursor-not-allowed"
                     : "hover:bg-gray-100 dark:hover:bg-gray-800 bg-opacity-10 dark:bg-opacity-10"
               } flex items-center gap-2 px-4 py-1 mb-1 mr-4 font-sans text-gray-900 duration-150 rounded-md dark:text-gray-300`}
               onClick={() => clipboard.copy(editorCode)}
               disabled={clipboard.copied}
            >
               {clipboard.copied ? <TiTick /> : <AiFillCopy />}
               {clipboard.copied ? "Copied!" : "Copy"}
            </button>
         </span>
         <Highlight
            codeString={editorCode}
            language={language}
            showLines={showLines}
         />
      </div>
   );
};

export default Codeblock;
