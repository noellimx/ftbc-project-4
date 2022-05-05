const StackOptions: React.FC<StackOptionsProps> = ({
  stackWindow,
  stackEndLocation,
  stackRadius,
  onSwitchUp = () => {},
  onSwitchDown = () => {},
}) => {
  const isWindow = stackWindow > 0;
  return (
    <>
      {/* <Box sx={{ color: isWindow ? "text.primary" : "black" }}>
        Stack Options
      </Box> */}
      {
        <Switch
          checked={isWindow}
          onClick={() => {
            if (isWindow) {
              onSwitchDown();
            } else {
              onSwitchUp();
            }
          }}
        />
      }{" "}
      {isWindow ? <div>{stackWindow} mins</div> : <></>}
    </>
  );
};