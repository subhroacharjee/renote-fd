import { Backdrop, CircularProgress } from "@material-ui/core";

export default function Loader (props) {
    return (
        <Backdrop open={true}>
            <CircularProgress/>
        </Backdrop>
    );
}