var path = window.location.pathname.split("/")

const navData = [
    {
        name: "首页",
        url: "/index",
        class: "",
        child: {
            name: [],
            url: []
        }
    },
    {
        name: "车辆监控",
        url: "/monitor",
        class: path[1] === "monitor" ? "active" : "",
        child: [
            {
                name: "GPS监控",
                url: "/gps",
                class: path[2] === "gps" ? "item-on" : ""
            },
            {
                name: "车辆检测",
                url: "/detect",
                class: path[2] === "detect" ? "item-on" : ""
            },
            {
                name: "驾驶行为",
                url: "/behavior",
                class: path[2] === "behavior" ? "item-on" : ""
            },
            {
                name: "驾驶行为提醒",
                url: "/remind",
                class: path[2] === "remind" ? "item-on" : ""
            },
            {
                name: "电子围栏提醒",
                url: "/geofence",
                class: path[2] === "geofence" ? "item-on" : ""
            },
            {
                name: "轨迹回放",
                url: "/playback",
                class: path[2] === "playback" ? "item-on" : ""
            },
            {
                name: "位置信息",
                url: "/position",
                class: path[2] === "position" ? "item-on" : ""
            }
        ]
    },
    {
        name: "车辆管理",
        url: "/car_manage",
        class: path[1] === "car_manage" ? "active" : "",
        child: [
            {
                name: "车辆列表",
                url: "/manage",
                class: path[2] === "manage" ? "item-on" : ""
            },
            {
                name: "车辆违规",
                url: "/illegal",
                class: path[2] === "illegal" ? "item-on" : ""
            }
        ]
    },
    {
        name: "机车管理",
        url: "/engine_manage",
        class: path[1] === "engine_manage" ? "active" : "",
        child: [
            {
                name: "车机库表",
                url: "/library",
                class: path[2] === "library" ? "item-on" : ""
            },
            {
                name: "司机绑定",
                url: "/bind",
                class: path[2] === "bind" ? "item-on" : ""
            },
            {
                name: "车机维修",
                url: "/warranty",
                class: path[2] === "warranty" ? "item-on" : ""
            },
            {
                name: "车机报废",
                url: "/scrap",
                class: path[2] === "scrap" ? "item-on" : ""
            }
        ]
    },
    {
        name: "异常报警",
        url: "/alarm",
        class: path[1] === "alarm" ? "active" : "",
        child: [
            {
                name: "车机报警",
                url: "/alarm",
                class: path[2] === "alarm" ? "item-on" : ""
            },
            {
                name: "车辆安防告警",
                url: "/safety",
                class: path[2] === "safety" ? "item-on" : ""
            },
            {
                name: "车辆驾驶状态报警",
                url: "/driving",
                class: path[2] === "driving" ? "item-on" : ""
            },
            {
                name: "车辆回收预警",
                url: "/retrieve",
                class: path[2] === "retrieve" ? "item-on" : ""
            },
            {
                name: "失联报警",
                url: "/lost",
                class: path[2] === "lost" ? "item-on" : ""
            }
        ]
    },
    {
        name: "分析报告",
        url: "/report",
        class: path[1] === "report" ? "active" : "",
        child: [
            {
                name: "驾驶行为分析",
                url: "/analysis",
                class: path[2] === "analysis" ? "item-on" : ""
            },
            {
                name: "违章分析",
                url: "/illegal",
                class: path[2] === "illegal" ? "item-on" : ""
            }
        ]
    },
    {
        name: "监控设置",
        url: "/monitor_set",
        class: path[1] === "monitor_set" ? "active" : "",
        child: [
            {
                name: "电子围栏设置",
                url: "/setting",
                class: path[2] === "setting" ? "item-on" : ""
            },
            {
                name: "驾驶行为提醒",
                url: "/remind",
                class: path[2] === "remind" ? "item-on" : ""
            }
        ]
    },
    {
        name: "公司管理",
        url: "/company_manage",
        class: path[1] === "company_manage" ? "active" : "",
        child: [
            {
                name: "出租车公司列表",
                url: "/taxi",
                class: path[2] === "taxi" ? "item-on" : ""
            },
            {
                name: "OBD公司列表",
                url: "/obd",
                class: path[2] === "obd" ? "item-on" : ""
            }
        ]
    },
    {
        name: "系统设置",
        url: "/system_set",
        class: path[1] === "system_set" ? "active" : "",
        child: [
            {
                name: "用户管理",
                url: "/user",
                class: path[2] === "user" ? "item-on" : ""
            },
            {
                name: "角色管理",
                url: "/role",
                class: path[2] === "role" ? "item-on" : ""
            },
            {
                name: "权限管理",
                url: "/permission",
                class: path[2] === "permission" ? "item-on" : ""
            },
            {
                name: "操作日志",
                url: "/log",
                class: path[2] === "log" ? "item-on" : ""
            }
        ]
    }
]

export default navData