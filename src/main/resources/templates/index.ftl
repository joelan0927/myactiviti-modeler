<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8"/>
		<title>Activiti6流程设计器Demo</title>
		<link rel="stylesheet" href="editor-app/libs/bootstrap_3.1.1/css/bootstrap.min.css"/>
		<script src="editor-app/libs/jquery_1.11.0/jquery.min.js"></script>
		<script src="editor-app/libs/bootstrap_3.1.1/js/bootstrap.min.js"></script>
	</head>
	<body>
		<h1 style="padding-left: 20px;padding-top: 20px">
			<a href="/create?name=activiti&key=ProcessKey" class="btn btn-success btn-lg btn-default">绘制流程</a>
		</h1>
		<div style="padding-top: 40px">
			<table width="100%" class="table table-bordered" style="text-align: center">
				<thead>
				<tr>
					<th style="text-align: center" width="10%">模型编号</th>
					<th style="text-align: center" width="10%">版本</th>
					<th style="text-align: center" width="20%">模型名称</th>
					<th style="text-align: center" width="20%">模型key</th>
					<th style="text-align: center" width="40%">操作</th>
				</tr>
				</thead>
				<tbody>
				<#list modelList as model>
				<tr>
					<td width="10%"><h4><span class="label label-primary">${model.id}</span></h4></td>
					<td width="10%"><h4><span class="label label-primary">${model.version}</span></h4></td>
					<td width="20%"><h4><span class="label label-primary"><#if (model.name)??>${model.name}<#else> </#if></span></h4></td>
					<td width="20%"><h4><span class="label label-primary"><#if (model.key)??>${model.key}<#else> </#if></span></h4></td>
					<td width="40%">
						<div class="btn-group" role="group" aria-label="...">
							<a href="/editor?modelId=${model.id}" class="btn btn-success btn-group-xs">编辑</a>
							<button type="button" onclick="publish(${model.id})" class="btn btn-success btn-group-xs">发布</button>
							<button type="button" onclick="revokePublish(${model.id})" class="btn btn-success btn-group-xs">撤销</button>
							<button type="button" onclick="del(${model.id})" class="btn btn-success btn-group-xs">删除</button>
						</div>
					</td>
				</tr>
				</#list>
				<tbody>
			</table>
		</div>
		<script>
			function publish(id) {
				var url = "/publish?modelId=" + id;
				$.ajax({
					url:url,
					type:'post',
					async:false,
					dataType: "json",
					traditional: true,
					success:function(data){
						alert(data.code);
						window.location.reload();
					},error:function(){

					}
				});
			}

			function revokePublish(id) {
				var url = "/revokePublish?modelId=" + id;
				$.ajax({
					url:url,
					type:'post',
					async:false,
					dataType: "json",
					traditional: true,
					success:function(data){
						alert(data.code);
						window.location.reload();
					},error:function(){

					}
				});
			}

			function del(id) {
				var url = "/delete?modelId="+id;
				$.ajax({
					url:url,
					type:'post',
					async:false,
					dataType: "json",
					traditional: true,
					success:function(data){
						alert(data.code);
						window.location.reload();
					},error:function(){

					}
				});
			}
		</script>
	</body>
</html>