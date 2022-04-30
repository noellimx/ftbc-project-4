import * as React from "react";

import {
  Links,
  TrulyImpure,
  Link,
  LinkStringFieldModifierHandler,
  LinkBooleanFieldModifierHandler,
} from "../types/types";


import NewLinkForm from "./Links/NewLinkForm";
import LinksView from "./Links/LinksView";
import SubmitUrlButton from "./Buttons/SubmitUrlButton";


const mockLinks = () => [
  { url: "http://www.some.com", isRead: false, id: 1 },
  { url: "other.com", isRead: true, id: 2 },
];

const isUrlOk = async (url: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", () => resolve(true));
    oReq.addEventListener("error", () => resolve(false));
    oReq.addEventListener("abort", () => resolve(false));
    oReq.open("GET", url, true);
    oReq.send();
  });
  // return url.length > 5;
};

export const App: React.FC = () => {
  const [links, setLinks] = React.useState<Links>(mockLinks());
  const [newUrlValue, setNewUrlValue] = React.useState<string>("");

  const [isUrlValueValid, setIsUrlValueValid] = React.useState<boolean>(false);

  const submitNewLink: TrulyImpure = () => {
    console.log(`[submitNewLink]`);
    setNewUrlValue((currentUrl) => {
      setLinks((prevLinks) => {
        const newLink: Link = {
          id: prevLinks.length === 0 ? 1 : prevLinks[0].id + 1,
          isRead: false,
          url: currentUrl,
        };
        return [...prevLinks, newLink];
      });
      return "";
    });
  };

  const newLinkFieldUpdated: LinkStringFieldModifierHandler = (val) => {
    setNewUrlValue((_) => val);
  };

  React.useEffect(() => {
    const _use: TrulyImpure = async () => {
      const is = await isUrlOk(newUrlValue);
      setIsUrlValueValid((_) => is);
    };
    _use();

    return () => {};
  }, [newUrlValue]);

  const linkIsRead: LinkBooleanFieldModifierHandler = (id) => {
    console.log(`[linkIsRead] ${id}`);
    setLinks((prevLinks) => [
      ...prevLinks.map((link) => {
        console.log(id === link.id);
        return id === link.id ? { ...link, isRead: true } : link;
      }),
    ]);
  };

  const linkIsFresh: LinkBooleanFieldModifierHandler = (id) => {
    setLinks((prevLinks) =>
      prevLinks.map((link) =>
        id === link.id ? { ...link, isRead: false } : link
      )
    );
  };
  return (
    <>
      <NewLinkForm
        newUrlValue={newUrlValue}
        newLinkFieldUpdated={newLinkFieldUpdated}
      >
        {
          <>
            <SubmitUrlButton
              shouldDisable={!isUrlValueValid}
              onClickFn={isUrlValueValid ? submitNewLink : () => {}}
            />
          </>
        }
      </NewLinkForm>
      <LinksView
        links={links}
        linkIsFresh={linkIsFresh}
        linkIsRead={linkIsRead}
      />
    </>
  );
};
