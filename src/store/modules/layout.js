import _ from "lodash";

function findInsertPosition(curLayout, target) {
    const { w: tW, h: tH } = target;
    const maxH = _(curLayout).filter(({ x, w }) => x + w <= tW).map(({ y, h }) => y + h).max();
    return _.assign(target, {
        x: 0,
        y: maxH
    });
}

export default {
    state: () => ({
        layout: [
            { x: 0, y: 0, w: 9, h: 3, title: "主视图" },
            { x: 9, y: 0, w: 3, h: 3, title: "污染物质" },
            { x: 0, y: 3, w: 9, h: 1, title: "时序预测" },
            { x: 9, y: 3, w: 3, h: 1, title: "传输路径" },
        ],
        drawer: [
            { w: 3, h: 1, title: "测试1" },
            { w: 3, h: 2, title: "测试2" }
        ]
    }),
    mutations: {
        insertIntoDashboard(state, target) {
            const drawerIndex = state.drawer.indexOf(target);
            if (drawerIndex != -1) {
                const layoutObject = state.drawer[drawerIndex];
                state.drawer = _.pullAt(state.drawer, [drawerIndex]);
                const caledLayout = findInsertPosition(state.layout, layoutObject);
                state.layout.push(caledLayout);
            }
        },
        removeFromDashboard(state, target) {
            const layoutIndex = state.layout.indexOf(target);
            if (layoutIndex != -1) {
                const layoutObject = state.layout[layoutIndex];
                state.layout = _.pullAt(state.layout, [layoutIndex]);
                state.drawer.push(layoutObject);
            }
        }
    }
}