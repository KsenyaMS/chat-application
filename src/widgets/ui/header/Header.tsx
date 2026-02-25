import { CssComponent } from "../../../shared";
import { HeaderLeftBlock } from "./HeaderLeftBlock";
import { HeaderCentralBlock } from "./HeaderCentralBlock";
import { HeaderRightBlock } from "./HeaderRightBlock";

const css: CssComponent = {
    header: {
        width: '100%',
        height: '55px',
        boxSizing: 'border-box',
        padding: '5px 20px 5px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
}

export const Header = () => {
    return <div style={css.header}>
        <HeaderLeftBlock />
        <HeaderCentralBlock />
        <HeaderRightBlock />
    </div>
}