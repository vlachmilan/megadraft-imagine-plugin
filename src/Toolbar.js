import React from "react";

// eslint-disable-next-line no-redeclare
const smallIcon =
  "M5 20.558v-.9c0-.122.04-.226.122-.312a.404.404 0 0 1 .305-.13h13.347a.45.45 0 0 1 .32.13c.092.086.138.19.138.312v.9a.412.412 0 0 1-.138.313.435.435 0 0 1-.32.13H5.427a.39.39 0 0 1-.305-.13.432.432 0 0 1-.122-.31zm0-3.554V9.01c0-.12.04-.225.122-.31a.4.4 0 0 1 .305-.13h13.347c.122 0 .23.043.32.13.092.085.138.19.138.31v7.994a.462.462 0 0 1-.138.328.424.424 0 0 1-.32.145H5.427a.382.382 0 0 1-.305-.145.501.501 0 0 1-.122-.328zM5 6.342v-.87c0-.12.04-.23.122-.327A.382.382 0 0 1 5.427 5h13.347c.122 0 .23.048.32.145a.462.462 0 0 1 .138.328v.87c0 .12-.046.225-.138.31a.447.447 0 0 1-.32.13H5.427a.4.4 0 0 1-.305-.13.44.44 0 0 1-.122-.31z";
// eslint-disable-next-line no-redeclare
const mediumIcon =
  "M3 17.004V9.01a.4.4 0 0 1 .145-.31.476.476 0 0 1 .328-.13h17.74c.12 0 .23.043.327.13a.4.4 0 0 1 .145.31v7.994a.404.404 0 0 1-.145.313.48.48 0 0 1-.328.13H3.472a.483.483 0 0 1-.327-.13.402.402 0 0 1-.145-.313zm2.212 3.554v-.87c0-.13.05-.243.145-.334a.472.472 0 0 1 .328-.137H19c.124 0 .23.045.322.137a.457.457 0 0 1 .138.335v.86c0 .12-.046.22-.138.31a.478.478 0 0 1-.32.13H5.684a.514.514 0 0 1-.328-.13.415.415 0 0 1-.145-.32zm0-14.246v-.84c0-.132.05-.243.145-.334A.477.477 0 0 1 5.685 5H19a.44.44 0 0 1 .322.138.455.455 0 0 1 .138.335v.84a.451.451 0 0 1-.138.334.446.446 0 0 1-.32.138H5.684a.466.466 0 0 1-.328-.138.447.447 0 0 1-.145-.335z";
// eslint-disable-next-line no-redeclare
const largeIcon =
  "M4.027 17.24V5.492c0-.117.046-.216.14-.3a.453.453 0 0 1 .313-.123h17.007c.117 0 .22.04.313.12.093.08.14.18.14.3v11.74c0 .11-.046.21-.14.3a.469.469 0 0 1-.313.12H4.48a.432.432 0 0 1-.314-.13.41.41 0 0 1-.14-.3zm2.943 3.407v-.833a.45.45 0 0 1 .122-.322.387.387 0 0 1 .276-.132H18.61a.35.35 0 0 1 .27.132.472.472 0 0 1 .116.322v.833c0 .117-.04.216-.116.3a.361.361 0 0 1-.27.123H7.368a.374.374 0 0 1-.276-.124.405.405 0 0 1-.122-.3z";

const ICONS = [
  { id: "small", icon: smallIcon, width: "50%" },
  { id: "medium", icon: mediumIcon, width: "75%" },
  { id: "large", icon: largeIcon, width: "99%" }
];

// eslint-disable-next-line no-redeclare
const SvgIcon = props => {
  const { fill, path } = props;
  return (
    <span className="svgIcon svgIcon--imageInsetCenter svgIcon--25px">
      <svg
        className="svgIcon-use"
        width="25"
        height="25"
        viewBox="0 0 25 25"
        style={fill}
      >
        <path d={path} fillRule="evenodd" />
      </svg>
    </span>
  );
};

export default function Toolbar(props) {
  const { changeSize, size } = props;

  const setSize = newSize => {
    changeSize(newSize);
  };

  const icons = ICONS.map((icon, index) => {
    const fill = size === icon.width ? "#48e79a" : "#fff";
    const style = { fill: fill };
    return (
      <div
        key={`image_${icon.id}`}
        onClick={() => setSize(icon.width)}
        style={styles.button}
      >
        <SvgIcon fill={style} key={icon.id} path={icon.icon} />
      </div>
    );
  });

  return <div style={styles.reference}>{icons}</div>;
}

const styles = {
  button: {
    cursor: "pointer"
  },
  reference: {
    fontFamily: "Roboto",
    fontSize: "13px",
    fontWeight: "300",
    "border-radius": "5px",
    background: "#303030",
    boxShadow: "0 3px 10px 0 rgba(0,0,0,0.3)",
    border: "3px solid rgba(0,0,0,0.1)",
    textAlign: "center",
    zIndex: "2",
    padding: "10px",
    display: "flex",
    width: "90px",
    justifyContent: "space-between"
  }
};
