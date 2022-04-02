export const columns = [
  {
    title: "HOLDING",
    dataIndex: "holding",
    key: "holding",
    align: "left",
    scopedSlots: { customRender: "holding" },
    mStyle: {
      width: "68px",
      textAlign: "left",
    },
  },
  {
    title: "POSITION",
    dataIndex: "position",
    key: "position",
    scopedSlots: { customRender: "position" },
    mWidth: "52px",
    mStyle: {
      width: "75px",
      textAlign: "left",
    },
  },
  {
    title: "uPnL",
    dataIndex: "pnl",
    key: "pnl",
    scopedSlots: { customRender: "pnl" },
    mStyle: {
      width: "60px",
      textAlign: "left",
    },
  },
  {
    title: "CLOSE",
    key: "action",
    scopedSlots: { customRender: "action" },
    align: "center",
    mStyle: {
      flex: 1,
      textAlign: "left",
    },
    fixed: "right",
  },
];
export const dataSource = [
  {
    key: "1",
    holding: "LONG",
    position: 32,
    address: "New York No. 1 Lake Park",
    pnl: "ssss",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    holding: "LONG",
    position: 42,
    address: "London No. 1 Lake Park",
    pnl: "ssss",

    tags: ["loser"],
  },
  {
    key: "3",
    holding: "LONG",
    position: 32,
    address: "Sidney No. 1 Lake Park",
    pnl: "ssss",

    tags: ["cool", "teacher"],
  },
  {
    key: "4",
    holding: "LONG",
    position: 32,
    address: "Sidney No. 1 Lake Park",
    pnl: "ssss",

    tags: ["cool", "teacher"],
  },
  {
    key: "5",
    holding: "LONG",
    position: 32,
    address: "Sidney No. 1 Lake Park",
    pnl: "ssss",

    tags: ["cool", "teacher"],
  },
  {
    key: "6",
    holding: "LONG",
    position: 32,
    address: "Sidney No. 1 Lake Park",
    pnl: "ssss",

    tags: ["cool", "teacher"],
  },
  {
    key: "7",
    holding: "LONG",
    position: 32,
    address: "Sidney No. 1 Lake Park",
    pnl: "ssss",
    tags: ["cool", "teacher"],
  },
];
