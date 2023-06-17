import * as React from "@types/react";

declare module "react" {
   interface FunctionComponent<P = object> {
      (props: PropsWithChildren<P>, context?: any): ReactElement<
         any,
         any
      > | null;
   }
}
