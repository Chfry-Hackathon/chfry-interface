---
apiVersion: apps/v1
kind: Deployment
metadata:
  namespace: gtd
  name: CHANGE_APP_NAME
  labels:
    app: CHANGE_APP_NAME
spec:
  replicas: CHANGE_REPLICAS
  selector:
    matchLabels:
      app: CHANGE_APP_NAME
  template:
    metadata:
      labels:
        app: CHANGE_APP_NAME
    spec:
      imagePullSecrets:
        - name: harbor
      containers:
      - name: CHANGE_APP_NAME
        image: CHANGE_APP_IMAGE
        imagePullPolicy: Always
        ports:
        - containerPort: 80
---
kind: Service
apiVersion: v1
metadata:
  name: CHANGE_APP_NAME-svc
  namespace: gtd
spec:
  selector:
    app: CHANGE_APP_NAME
  ports:
  - protocol: TCP
    targetPort: 80
    port: 80
  type: ClusterIP
---
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: CHANGE_APP_NAME-web
  namespace: gtd
spec:
  rules:
  - host: CHANGE_APP_URL
    http:
      paths:
      - backend:
          serviceName: CHANGE_APP_NAME-svc
          servicePort: 80
status:
  loadBalancer:
    ingress:
    - hostname: localhost


