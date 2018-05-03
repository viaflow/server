# Schemas(earlier version)

---

**cronflow**

---

cronflow_id

cronflow_name

cronflow_tags

cronflow_nodes

cronflow_triggered

cronflow_desc

latest_date

latest_status

next_date

created_date

created_user

updated_date

updated_user

---

**cronflow_node**

---

node_id  自身id

flow_id  归属flow

plugin_id  代入目标插件

is_entry  是否入口函数

parallel_level  并行等级

node_config  代入配置

node_sequence  串行顺序

node_privacy (public/private/inflow)  是否公开

execute_hash  node哈希值

created_date

created_user

updated_date

updated_user

---

**cronflow_plugin**

---

plugin_id

plugin_tag

plugin_name

plugin_md

plugin_available  是否可用（检查入口函数）

plugin_path  插件源码路径

plugin_main  插件入口文件

plugin_author

plugin_version

latest_version

updated_date

---

**plugin_histroy**

---

history_id

plugin_id

plugin_tag

plugin_name

plugin_md

plugin_available  是否可用（检查入口函数）

plugin_path  插件源码路径

plugin_main  插件入口文件

plugin_author

plugin_version

latest_version

updated_date

---

**cronflow_secret**

---

secret_id

target_flow (all/cronflow_id)  是否公开

secret_key

secret_value

---

**cronflow_user**

---

user_id

user_name

user_token

user_password

user_role  权限部分暂时使用简单的设计，以后迭代

control_tags  权限对应的cronflow tags

creater

created_date

---

**log_execute**

---

log_id

batch_id 

cronflow_id 所属cronflow

log_step 本次batch的顺序

step_name 本次名称快照

step_in  输入内容

execute_content  执行期间日志

step_out  输出内容

execute_ages  耗时

execute_date  触发时间

---

**log_normal**

---

log_id

log_type

log_associated_user

log_content

created_date