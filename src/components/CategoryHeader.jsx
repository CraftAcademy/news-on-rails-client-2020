import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, Segment } from "semantic-ui-react";

const CategoryHeader = () => {
  const { t } = useTranslation();
  const [activeItem, setActiveItem] = useState("home");
  const handleTabClick = (e, { name }) => {
    setActiveItem(name);
  };

  return (
    <Segment inverted>
    <Menu inverted pointing secondary className="category-header" widths={7}>
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleTabClick}
        as={Link}
        to={{ pathname: "/" }}
      >
        {t("home-tab")}
      </Menu.Item>
      <Menu.Item
        name="culture"
        active={activeItem === "culture"}
        onClick={handleTabClick}
        as={Link}
        to={{ pathname: "/articles/culture" }}
      >
        {t("culture-tab")}
      </Menu.Item>
      <Menu.Item
        name="economy"
        active={activeItem === "economy"}
        onClick={handleTabClick}
        as={Link}
        to={{ pathname: "/articles/economy" }}
      >
        {t("economy-tab")}
      </Menu.Item>
      <Menu.Item
        name="international"
        active={activeItem === "international"}
        onClick={handleTabClick}
        as={Link}
        to={{ pathname: "/articles/international" }}
      >
        {t("international-tab")}
      </Menu.Item>
      <Menu.Item
        name="lifestyle"
        active={activeItem === "lifestyle"}
        onClick={handleTabClick}
        as={Link}
        to={{ pathname: "/articles/lifestyle" }}
      >
        {t("lifestyle-tab")}
      </Menu.Item>
      <Menu.Item
        name="local"
        active={activeItem === "local"}
        onClick={handleTabClick}
        as={Link}
        to={{ pathname: "/articles/local" }}
      >
        {t("local-tab")}
      </Menu.Item>
      <Menu.Item
        name="sports"
        active={activeItem === "sports"}
        onClick={handleTabClick}
        as={Link}
        to={{ pathname: "/articles/sports" }}
      >
        {t("sports-tab")}
      </Menu.Item>
    </Menu>
    </Segment>
  );
};
export default CategoryHeader;
