# docker compose 常用指令

## 启动容器

根据 docker-compose.yml 文件中的配置启动所有定义的容器。

```bash
docker-compose up
# or
docker-compose up -d #（以后台模式运行）
```

## 关闭容器

停止并删除所有相关的容器、网络和卷。

```bash
docker-compose down
```

## 构建镜像

根据 docker-compose.yml 文件中的配置构建所有定义的镜像。

```bash
docker-compose build
```

## 查看容器状态

显示正在运行的容器的状态。

```bash
docker-compose ps
```

## 查看容器日志

显示容器的日志输出。

```bash
docker-compose logs
```

## 进入容器

在指定的服务中执行给定的命令。

```bash
docker-compose exec <service> <command>
```
