# ViaFlow
Cronflow backend - Make pipeline cron job easier and amazing.

For now this current version is only a alpha version, a lot of features are not completed. You could check the roadmap below to determine the current progress of the viaflow.

# Demo start compose file:

Init your mysql database with ([db-init SQL script][dbscript]). Then start with docker-compose:

```yaml
version: '2'
services:
  server:
    image: viaflow/server:latest_rc
    environment:
      PORT: '8080'
      DATABASE_DIALECT: mysql
      DATABASE_HOST: Mysql host
      DATABASE_PORT: Mysql port
      DATABASE_USERNAME: mysql user
      DATABASE_NAME: database name
      DATABASE_PASSWORD: mysql password
      TOKEN_SECRET: JWT secret
      TOKEN_EXPRIED: JWT expried, e.g. 7d
      TOKEN_ALGORITHMS: HS256
      REDIS_HOST: redis host
      REDIS_PORT: redis port
      REDIS_AUTH: redis auth
      REDIS_DB: default redis db
    stdin_open: true
    tty: true
    ports:
    - 9902:8080/tcp
  agent:
    image: viaflow/agent:latest_rc
    environment:
      DATABASE_DIALECT: mysql
      DATABASE_HOST: Mysql host
      DATABASE_PORT: Mysql port
      DATABASE_USERNAME: mysql user
      DATABASE_NAME: database name
      DATABASE_PASSWORD: mysql password
      REDIS_HOST: redis host
      REDIS_PORT: redis port
      REDIS_AUTH: redis auth
      REDIS_DB: default redis db
      NPM_REGISTRY_TAOBAO: default is false, if true then use taobao npm registry
    stdin_open: true
    tty: true
```

Then access localhost:8080/flow/add to check features. Login name is sa1, password is 123456.

# Roadmap

### Phase 1

- [x] Flow create page
- [x] Flow list page
- [x] Flow basic information edit page
- [x] Node addition page in flow detail
- [x] Node cascading list page in flow detail
- [x] Plug-ins list page
- [x] Plug-ins create page
- [x] Plug-ins detail and fields page
- [x] Agent restore plug-ins
- [x] Agent execute a flow with nodes

### Phase 2

- [ ] **Flow中Node的配置编辑**(doing)
- [ ] Flow中Node的删除
- [ ] Flow中每一步的执行结果的记录和执行后更新自身基本信息
- [ ] Flow最近10次的已执行日志展示
- [ ] Flow最近5次即将执行的时间
- [ ] 编写阿里云短信插件
- [ ] 编写邮件发送插件
- [ ] 编写ssh插件

### Phase 3

- [ ] 页面逻辑的优化
- [ ] 操作人的完善（登录后写入到request信息中）
- [ ] 对密码进行加密处理
- [ ] 系统用户的简单管理（CRUD）
- [ ] 用户日志的记录

### Phase 4

- [ ] 企业微信/钉钉 OAuth接入
- [ ] Github OAuth接入
- [ ] 自有账户系统的权限细分和完善（考虑独立的用户中心）

### Phase 5

- [ ] 优化插件更新逻辑，在server中更新插件时，增量或减量操作对应到agent
- [ ] 编写单元测试脚本，在rc版本镜像构建时加入测试脚本的运行
- [ ] 将系统接口全部统一成GraphQL版本
- [ ] UI作为独立的Project，决定使用Reactjs或者Angular，需要重新思考构建逻辑。
- [ ] 编写安装文档，在社区中进行推广
- [ ] 考虑制作公有云服务版本


[dbscript]:https://github.com/viaflow/server/blob/develop/local_initialization/20180425.init.sql
