import Gate from "src/circuit/Gate.js"
import GatePainting from "src/ui/GatePainting.js"
import Matrix from "src/math/Matrix.js"

let PostSelectionGates = {};
export default PostSelectionGates;

let POST_SELECT_DRAWER = args => {
    if (args.isInToolbox  || args.isHighlighted) {
        GatePainting.DEFAULT_DRAWER(args);
    } else {
        args.painter.fillRect(args.rect, 'white');
        GatePainting.paintGateSymbol(args);
    }

    if (!args.isInToolbox) {
        let {x, y, w, h} = args.rect;
        args.painter.print("post-", x + w / 2, y, 'center', 'hanging', 'red', '10px Helvetica', w, h / 2);
        args.painter.print("select", x + w / 2, y + h, 'center', 'bottom', 'red', '10px Helvetica', w, h / 2);
    }
};

PostSelectionGates.PostSelectOff = Gate.fromKnownMatrix(
    "|0⟩⟨0|",
    Matrix.square(1, 0, 0, 0),
    "Post-selection Gate [Off]",
    "Keeps OFF states, discards ON states, and renormalizes\n" +
        "(Corresponds to restarting until the right answer happens.)").
    withCustomDrawer(POST_SELECT_DRAWER);

PostSelectionGates.PostSelectOn = Gate.fromKnownMatrix(
    "|1⟩⟨1|",
    Matrix.square(0, 0, 0, 1),
    "Post-selection Gate [On]",
    "Keeps ON states, discards OFF states, and renormalizes.\n" +
        "(Corresponds to restarting until the right answer happens.)").
    withCustomDrawer(POST_SELECT_DRAWER);

PostSelectionGates.PostSelectPlus = Gate.fromKnownMatrix(
    "|+⟩⟨+|",
    Matrix.square(1, 1, 1, 1).times(Math.sqrt(0.5)),
    "Post-selection Gate [+]",
    "Keeps ON+OFF states, discards ON-OFF states, and renormalizes\n" +
    "(Corresponds to restarting until the right answer happens.)").
    withCustomDrawer(POST_SELECT_DRAWER);

PostSelectionGates.PostSelectMinus = Gate.fromKnownMatrix(
    "|-⟩⟨-|",
    Matrix.square(1, -1, -1, 1).times(Math.sqrt(0.5)),
    "Post-selection Gate [-]",
    "Keeps ON-OFF states, discards ON+OFF states, and renormalizes\n" +
    "(Corresponds to restarting until the right answer happens.)").
    withCustomDrawer(POST_SELECT_DRAWER);

PostSelectionGates.all = [
    PostSelectionGates.PostSelectOff,
    PostSelectionGates.PostSelectOn,
    PostSelectionGates.PostSelectPlus,
    PostSelectionGates.PostSelectMinus
];
