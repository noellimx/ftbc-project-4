/** React 18 */

import * as React from "react";

import { createRoot } from "react-dom/client";
import { Link as MLink } from "@mui/material";

// import App from "./react_components/App.tsx";
const rootHTMLElement: HTMLElement = document.createElement("div");
document.body.appendChild(rootHTMLElement);

const mockLinks = () => [
  { url: "http://www.some.com", isRead: false, id: 1 },
  { url: "other.com", isRead: true, id: 2 },
];

interface Link {
  id: number;
  url: string;
  isRead?: boolean;
}

type Links = Link[];

type LinkBooleanFieldModifierHandler = (id: number) => void;

type LinkStringFieldModifierHandler = (val: string) => void;

type TrulyImpure = () => void;
// ROW 1

interface NewLinkFormProps {
  newUrlValue: string;
  newLinkFieldUpdated: LinkStringFieldModifierHandler;
  children?: JSX.Element;
}
const NewLinkForm: React.FC<NewLinkFormProps> = ({
  newUrlValue,
  newLinkFieldUpdated,
  children,
}) => {
  const onChangeFn = (e: React.ChangeEvent<HTMLInputElement>) => {
    newLinkFieldUpdated(e.target.value);
  };
  return (
    <>
      <input value={newUrlValue} onChange={onChangeFn}></input>
      {children}
    </>
  );
};

// ROW 2

interface ReadLinkProps {
  link: Link; // The model
  linkIsFresh: LinkBooleanFieldModifierHandler;
}

const ReadLink: React.FC<ReadLinkProps> = ({ link, linkIsFresh }) => {
  const { id, url } = link;
  const onClickUnReadFn = () => linkIsFresh(id);
  return (
    <>
      <div style={{ display: "flex" }}>
        <div>{`${id}`}</div>
        <MLink href={`${url}`}>{`${url}`}</MLink>
        <a
          href={`${url}`}
          target="_blank"
          rel="noopener noreferrer"
        >{`${url}`}</a>
        <button onClick={onClickUnReadFn}>Mark As UnRead</button>
      </div>
    </>
  );
};

interface ReadLinksViewProps {
  links: Links;
  linkIsFresh: LinkBooleanFieldModifierHandler;
}
const ReadLinksView: React.FC<ReadLinksViewProps> = ({
  links,
  linkIsFresh,
}) => {
  return (
    <>
      <div> Links I've Read </div>
      {links.map((link) => (
        <ReadLink key={link.id} link={link} linkIsFresh={linkIsFresh} />
      ))}
    </>
  );
};

interface FreshLinkProps {
  link: Link;
  linkIsRead: LinkBooleanFieldModifierHandler;
}

const FreshLink: React.FC<FreshLinkProps> = ({ link, linkIsRead }) => {
  const { id, url } = link;
  const onClickReadFn = () => linkIsRead(id);

  return (
    <>
      <div style={{ display: "flex" }}>
        <div>{`${id}`}</div>
        <a href={`${url}`} target="_blank" rel="noopener noreferrer">
          {`${url}`}
        </a>

        <button onClick={onClickReadFn}>Mark As Read</button>
      </div>
    </>
  );
};

interface FreshLinksViewProps {
  links: Links;
  linkIsRead: LinkBooleanFieldModifierHandler;
}
const FreshLinksView: React.FC<FreshLinksViewProps> = ({
  links,
  linkIsRead,
}) => {
  return (
    <>
      <div> Links To Read </div>
      {links.map((link) => (
        <FreshLink key={link.id} link={link} linkIsRead={linkIsRead} />
      ))}
    </>
  );
};

interface LinksViewProps {
  links: Links;
  linkIsFresh: LinkBooleanFieldModifierHandler;
  linkIsRead: LinkBooleanFieldModifierHandler;
}

const LinksView: React.FC<LinksViewProps> = ({
  links,
  linkIsRead,
  linkIsFresh,
}) => {
  const readLinks = links.filter(({ isRead }) => isRead);
  const freshLinks = links.filter(({ isRead }) => !isRead);
  return (
    <>
      <ReadLinksView
        links={readLinks}
        linkIsFresh={linkIsFresh}
      ></ReadLinksView>
      <FreshLinksView
        links={freshLinks}
        linkIsRead={linkIsRead}
      ></FreshLinksView>
    </>
  );
};

interface SubmitUrlButtonProps {
  onClickFn: TrulyImpure;
  shouldDisable: boolean;
}
const SubmitUrlButton: React.FC<SubmitUrlButtonProps> = ({
  onClickFn,
  shouldDisable,
}) => {
  console.log(`isDisabled ${shouldDisable}`);
  return (
    <button
      disabled={shouldDisable}
      style={{ backgroundColor: shouldDisable ? "black" : "green" }}
      onClick={onClickFn}
    >
      {" "}
      Submit{" "}
    </button>
  );
};

const App: React.FC = () => {
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
    //  const _use = (async () => {
    //     try {
    //       const some = await fetch(newUrlValue);
    //       console.log("some")
    //       console.log(some);
    //       setIsUrlValueValid((_) => true);
    //     } catch {
    //       setIsUrlValueValid((_) => false);
    //     }
    //   });

    const _use: TrulyImpure = async () => {
      setIsUrlValueValid((_) => newUrlValue.length > 5);
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

createRoot(rootHTMLElement).render(<App />);
