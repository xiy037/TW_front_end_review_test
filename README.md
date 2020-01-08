### front-end-evaluation

> 此库为非计培训前端测评的 homework, 根据 db.json 中的数据，实现效果图中的效果

#### 测评要求
    - 根据给定的 story 卡的内容和效果图，尽可能100%的还原
    - 尽可能的完成所有的 story 卡，以便获得更高的分数
    - 在线下pair前，提前准备好演示环境， 以便节约你的 pair 时间
    - 因为有删除操作，建议线下编码的过程中，先备份 db.json 中的数据
    - 注意编码规范

#### 项目 Story

[查看story卡](https://trello.com/invite/b/V4iT85Es/f2db24c52497ac0bf90addc758a1601d/%E9%9D%9E%E8%AE%A1%E5%9F%B9%E8%AE%AD%E5%89%8D%E7%AB%AF%E6%B5%8B%E8%AF%84-homework)

> 备注：如果需要做项目管理，请自行复制该看板到自己的trello中

#### 启动 mock-server 服务

1. 安装 [json-server](https://github.com/typicode/json-server)
> npm install -D json-server

1. 执行 mock sever:
> npx json-server --watch db.json
