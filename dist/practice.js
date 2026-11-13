const practiceFacts = `
# Both core
shared|Responsabilidad compartida|Un equipo necesita identificar quién debe parchear su aplicación en una máquina virtual.|Distingue los controles del proveedor de las obligaciones del cliente.
elastic|Elasticidad|Una tienda necesita añadir capacidad durante ofertas y reducirla al terminar.|Ajusta los recursos a los cambios en la demanda.
capex|Gasto operativo|Un negocio quiere pagar por uso sin comprar servidores por adelantado.|Convierte parte de la inversión inicial en costos de operación.
region|Región|El departamento legal exige que los recursos regionales se creen dentro de una geografía admitida.|Delimita el área geográfica de los recursos regionales.
az|Zona de disponibilidad|Una aplicación debe resistir la pérdida de un centro de datos dentro de una región.|Aísla fallos físicos dentro de la región.
iaas|IaaS|El equipo requiere acceso administrativo al sistema operativo invitado.|Proporciona infraestructura virtual con control del sistema invitado.
paas|PaaS|El equipo quiere publicar código web y delegar el mantenimiento de su plataforma.|Entrega un entorno administrado para ejecutar aplicaciones.
saas|SaaS|El negocio quiere usar correo electrónico listo para consumir mediante una suscripción.|Entrega una aplicación completa administrada por su proveedor.
# Both governance
inventory|Inventario de casos de uso|Un comité quiere conocer qué agentes están desplegados, quién los mantiene y qué datos usan.|Registra casos, propietarios, datos y estado de los sistemas.
human|Aprobación humana|Un agente propone reembolsos de alto valor que deben validarse antes de emitirlos.|Impide ejecutar una acción sensible sin la validación de una persona.
baseline|Línea base|Un equipo necesita comparar el tiempo de resolución antes y después de incorporar IA.|Establece un punto de comparación para evaluar el impacto.
impact|Evaluación de impacto|Antes de automatizar decisiones de crédito se debe estudiar el efecto potencial sobre solicitantes.|Analiza consecuencias y riesgos de un sistema para las partes afectadas.
retention|Política de retención|La organización debe eliminar los registros de pruebas al vencer su plazo autorizado.|Define cuánto tiempo se conservan los datos y cuándo se eliminan.
pilot|Piloto controlado|Un equipo quiere medir calidad y costo con un grupo pequeño antes de una adopción general.|Limita el alcance inicial para medir resultados y corregir fallos.
# Both ai
rag|Generación aumentada por recuperación|Un asistente debe consultar manuales actualizados antes de contestar.|Recupera contenido pertinente y lo incorpora al contexto de generación.
classify|Clasificación supervisada|Se necesita aprender a categorizar tickets con ejemplos previamente etiquetados.|Aprende a asignar clases a partir de ejemplos con respuesta conocida.
regression|Regresión|Se desea estimar el precio de una vivienda como un número continuo.|Estima valores numéricos continuos.
cluster|Agrupamiento|Un equipo quiere encontrar segmentos de clientes sin disponer de etiquetas.|Agrupa observaciones por similitud sin clases predefinidas.
detection|Detección de objetos|Un sistema debe localizar varios vehículos en una imagen con recuadros.|Identifica objetos y su posición en una imagen.
embed|Embeddings|Un buscador debe representar frases en vectores para compararlas por significado.|Representan datos en un espacio vectorial útil para medir similitud.
rerank|Reordenamiento de resultados|El buscador ya obtuvo candidatos, pero los más relevantes suelen quedar al final de la lista.|Vuelve a puntuar candidatos para ordenarlos según la consulta.
recall|Recall|El equipo quiere saber qué proporción de los fraudes reales identificó su modelo.|Mide la fracción de positivos reales detectados.
precision|Precisión de la clase positiva|El equipo quiere saber qué proporción de las alertas de fraude resultaron ser fraudes reales.|Mide la fracción de predicciones positivas que son correctas.
grounded|Fidelidad al contexto|Se quiere detectar si un asistente afirma cosas que sus documentos recuperados no sustentan.|Mide si las afirmaciones se sostienen con las fuentes recuperadas.
drift|Deriva de datos|La distribución de entradas en producción cambió desde el entrenamiento.|Describe un cambio en la distribución de las entradas con el tiempo.
leak|Fuga de datos|Durante el entrenamiento, una columna contiene información que solo estaría disponible después de la predicción.|Explica por qué una evaluación puede ser demasiado optimista al usar información indebida.
# Both ops
rto|RTO|El negocio quiere establecer el máximo tiempo aceptable para restaurar el servicio.|Define el objetivo de tiempo de recuperación.
rpo|RPO|El negocio quiere establecer cuántos minutos de datos podría perder ante una caída.|Define el objetivo de punto de recuperación.
canary|Despliegue canario|Una versión nueva debe exponerse primero a una fracción pequeña del tráfico real.|Limita inicialmente el tráfico del cambio para medir su comportamiento.
synthetic|Monitorización sintética|Se quiere comprobar periódicamente un flujo de compra aunque todavía no haya visitantes.|Ejecuta transacciones artificiales para medir disponibilidad y latencia.
trace|Trazado distribuido|Una petición cruza cinco servicios y se necesita encontrar cuál introdujo latencia.|Correlaciona las operaciones de una solicitud a través de servicios.
runbook|Runbook|El equipo quiere que los operadores sigan pasos probados para recuperar un servicio.|Documenta un procedimiento operativo repetible para incidentes o mantenimiento.
# Both dev
idem|Idempotencia|Reintentar una solicitud de pago debe producir un único cargo efectivo.|Permite repetir una operación sin duplicar su efecto esperado.
jitter|Backoff exponencial con jitter|Miles de clientes reintentan simultáneamente después de recibir respuestas de limitación de tasa.|Espacia y aleatoriza reintentos para reducir picos sincronizados.
dlq|Cola de mensajes fallidos|Se necesita revisar mensajes que agotaron sus intentos de procesamiento.|Aísla mensajes fallidos para diagnóstico y reprocesamiento.
event|Publicación y suscripción|Una misma alta de cliente debe notificarse a facturación, soporte y analítica.|Distribuye eventos de un productor a varios suscriptores independientes.
circuit|Circuit breaker|Una dependencia falla repetidamente y se necesita dejar de llamarla durante un período corto.|Interrumpe temporalmente llamadas a una dependencia que está fallando.
contract|Prueba de contrato|Dos equipos despliegan por separado y quieren detectar cambios incompatibles en un API antes de publicar.|Valida las expectativas acordadas entre consumidores y proveedores.
# Both security
mfa|Autenticación multifactor|Una contraseña filtrada no debe ser suficiente para entrar a una cuenta de operador.|Exige factores adicionales de autenticación.
least|Mínimo privilegio|Un servicio que solo lee registros requiere permisos ajustados a esa operación.|Limita permisos a las acciones y recursos necesarios.
rotate|Rotación de secretos|Un equipo quiere reemplazar periódicamente una credencial de integración.|Sustituye credenciales para limitar su vigencia y exposición.
tls|Cifrado en tránsito|Se necesita proteger información entre un cliente y un servicio mientras atraviesa una red.|Protege los datos durante la comunicación.
rest|Cifrado en reposo|Se necesita proteger datos persistidos en discos y archivos de respaldo.|Protege datos almacenados ante acceso al medio de almacenamiento.
audit|Auditoría de actividad|Se necesita reconstruir quién cambió una política y cuándo lo hizo.|Registra eventos atribuibles a identidades para investigación y cumplimiento.
# Both data
oltp|OLTP|Una plataforma debe procesar muchos pagos breves y concurrentes.|Optimiza transacciones operativas cortas y concurrentes.
olap|OLAP|Un analista necesita agregar ventas históricas sobre grandes volúmenes de datos.|Optimiza consultas analíticas y agregaciones.
column|Formato columnar|Las consultas analíticas leen pocas columnas de tablas muy anchas.|Organiza valores por columna para reducir lecturas en consultas selectivas.
partition|Particionamiento por fecha|Las consultas filtran casi siempre por día y deben omitir datos de otros períodos.|Separa datos por fecha para facilitar la poda de particiones.
cdc|Captura de cambios|Se quiere replicar inserciones y modificaciones desde un sistema transaccional sin copiar toda la tabla.|Captura los cambios incrementales del origen.
lineage|Linaje de datos|Un analista necesita rastrear qué fuentes y transformaciones produjeron una columna de un informe.|Representa el origen y la transformación de los datos.
# AWS compute
ec2|Amazon EC2|Se necesita instalar un controlador propio en una máquina virtual Linux.|Ofrece capacidad de cómputo con acceso al sistema operativo invitado.
lambda|AWS Lambda|Se necesita ejecutar código corto por cada archivo recibido, sin mantener servidores.|Ejecuta funciones a partir de eventos con infraestructura administrada.
fargate|AWS Fargate|Se necesita ejecutar contenedores de ECS sin administrar instancias de cómputo.|Entrega capacidad administrada para tareas en contenedores.
alb|Application Load Balancer|Dos microservicios HTTP necesitan recibir tráfico según la ruta solicitada.|Enruta tráfico de capa de aplicación según host, ruta u otras condiciones.
asg|EC2 Auto Scaling|La cantidad de instancias detrás de un balanceador debe subir con la demanda.|Ajusta y reemplaza instancias de un grupo según políticas.
cloudfront|Amazon CloudFront|Usuarios de distintos continentes descargan los mismos recursos web estáticos.|Entrega contenido mediante una red de borde que puede mantenerlo en caché.
# AWS network
gateway|Endpoint gateway de S3|Instancias privadas deben acceder a S3 sin NAT y sin una interfaz de red por subred.|Agrega acceso privado a S3 mediante tablas de rutas de la VPC.
transit|AWS Transit Gateway|Decenas de VPC deben conectarse a través de un centro de enrutamiento común.|Centraliza el enrutamiento entre redes adjuntas.
direct|AWS Direct Connect|Un centro de datos requiere conectividad dedicada con AWS sin usar Internet público como trayecto.|Proporciona conectividad de red dedicada entre instalaciones y AWS.
resolver|Route 53 Resolver inbound endpoint|Servidores DNS locales deben consultar zonas privadas de Route 53.|Recibe consultas reenviadas desde redes conectadas.
nacl|Network ACL|Se quiere aplicar filtrado de paquetes sin estado en el límite de una subred.|Filtra tráfico de entrada y salida en el nivel de subred.
sg|Security group|Se quiere permitir HTTPS a una interfaz EC2 y aceptar automáticamente el tráfico de retorno.|Aplica reglas con estado a recursos asociados.
# AWS security
kms|AWS KMS|Una aplicación necesita crear y controlar claves administradas para cifrar sus datos.|Administra claves criptográficas y operaciones de cifrado autorizadas.
guardduty|Amazon GuardDuty|El equipo necesita alertas por actividades sospechosas detectadas en señales de la cuenta.|Analiza telemetría y genera hallazgos de amenazas.
macie|Amazon Macie|Se quiere descubrir datos personales almacenados en buckets S3.|Clasifica información sensible en objetos S3.
waf|AWS WAF|Se quiere filtrar solicitudes HTTP con patrones de inyección SQL.|Aplica reglas de inspección a solicitudes web.
scp|Service control policy|Una organización quiere restringir el uso de regiones en cuentas miembro de una OU.|Establece límites de permisos en cuentas miembro.
secrets|AWS Secrets Manager|Se quiere almacenar y rotar una contraseña de base de datos.|Almacena secretos y admite flujos de rotación.
# AWS ops
cloudwatch|Amazon CloudWatch|Se necesita alertar cuando una métrica de uso de CPU supera un umbral durante varios minutos.|Recopila métricas y permite crear alarmas.
cloudtrail|AWS CloudTrail|Se busca la identidad que hizo una llamada para eliminar un bucket.|Registra actividad de API y datos del actor que la ejecutó.
config|AWS Config|Se necesita evaluar continuamente si los recursos cumplen una regla de configuración.|Registra configuraciones y evalúa recursos frente a reglas.
ssm|Systems Manager Session Manager|Se quiere abrir una consola de una EC2 privada sin abrir SSH de entrada.|Administra sesiones en instancias configuradas sin exponer puertos administrativos.
fis|AWS Fault Injection Service|Un equipo quiere terminar instancias de prueba bajo condiciones de parada definidas.|Ejecuta experimentos controlados para comprobar resiliencia.
backup|AWS Backup|Se necesitan políticas centrales de respaldo para varios tipos de recursos AWS.|Centraliza planes de respaldo y administración de puntos de recuperación.
# AWS data
s3|Amazon S3|Se quieren guardar millones de objetos identificados por clave.|Ofrece almacenamiento de objetos organizado en buckets.
glue|AWS Glue crawler|Se desea descubrir esquemas de archivos del lago y registrarlos para consulta.|Inspecciona orígenes y actualiza tablas del catálogo de Glue.
athena|Amazon Athena|Un analista quiere consultar archivos de S3 con SQL sin aprovisionar un clúster.|Ejecuta consultas SQL administradas sobre orígenes admitidos.
dynamo|Amazon DynamoDB|Una aplicación necesita operaciones por clave con latencia baja sin gestionar servidores de base de datos.|Ofrece una base NoSQL administrada de clave-valor y documentos.
kinesis|Kinesis Data Streams|Varios consumidores deben leer en tiempo real eventos retenidos en un flujo.|Ingiere y conserva secuencias de eventos para consumo continuo.
lake|AWS Lake Formation|Se quieren conceder permisos por columna en tablas registradas de un lago de datos.|Gobierna acceso granular a datos de un lago.
# Azure compute
vm|Azure Virtual Machines|Se necesita instalar software que requiere acceso al sistema operativo de un servidor.|Proporciona máquinas virtuales con control del sistema invitado.
apps|Azure App Service|Un equipo quiere alojar un sitio web mediante una plataforma administrada de aplicaciones.|Ejecuta aplicaciones web sin administrar directamente el sistema operativo.
functions|Azure Functions|Una tarea pequeña debe ejecutarse cuando llega un evento o se cumple un horario.|Ejecuta código orientado a eventos con un modelo de funciones.
aca|Azure Container Apps|Una aplicación en contenedores debe escalar según mensajes sin operar un clúster Kubernetes.|Ejecuta contenedores administrados con escalado de eventos.
aks|Azure Kubernetes Service|Un equipo necesita usar recursos Kubernetes y administrar cargas dentro de un clúster gestionado.|Proporciona un plano de control administrado de Kubernetes.
vmss|Virtual Machine Scale Sets|Se necesitan grupos de máquinas virtuales homogéneas que escalen por demanda.|Administra y escala conjuntos de máquinas virtuales.
# Azure network
pe|Azure Private Endpoint|Se quiere alcanzar una cuenta de almacenamiento por una IP privada dentro de la VNet.|Asigna una interfaz privada para acceder a un recurso admitido mediante Private Link.
er|ExpressRoute|Una organización necesita un circuito privado entre sus instalaciones y Azure.|Extiende redes locales hacia Azure mediante conectividad privada facilitada por un proveedor.
vpng|Azure VPN Gateway|Dos redes deben comunicarse mediante un túnel IPsec sobre Internet.|Proporciona conectividad cifrada entre redes.
nsg|Network Security Group|Se necesita limitar por origen, destino y puerto el tráfico de una subred.|Filtra tráfico con reglas de red con estado.
front|Azure Front Door|Un sitio HTTP global requiere enrutamiento hacia orígenes saludables y entrega desde el borde.|Dirige tráfico web global y acelera la entrega de aplicaciones.
bastion|Azure Bastion|Un administrador necesita conectarse a una VM con RDP sin publicar el puerto de la máquina.|Brinda acceso administrativo a VMs mediante un servicio administrado.
# Azure security
keyvault|Azure Key Vault|Varias aplicaciones deben recuperar secretos de un almacén con acceso controlado.|Protege claves, certificados y secretos con permisos configurables.
managedid|Identidad administrada|Una aplicación de Azure debe autenticarse ante un servicio sin guardar una contraseña.|Entrega una identidad de Entra administrada para obtener tokens.
policy|Azure Policy|Los despliegues deben ser rechazados si usan ubicaciones fuera de la lista permitida.|Evalúa y aplica reglas sobre la configuración de recursos.
rbac|Azure RBAC|Un operador debe leer recursos de un grupo con un ámbito limitado.|Asigna permisos de Azure a identidades en ámbitos específicos.
defender|Microsoft Defender for Cloud|Se necesita detectar configuraciones de riesgo en cargas de nube.|Evalúa postura de seguridad y genera recomendaciones.
purview|Etiquetas de confidencialidad de Purview|Un documento de nómina necesita clasificación y cifrado que viajen con él.|Clasifica contenido y puede aplicar medidas de protección persistentes.
# Azure ops
monitor|Azure Monitor|Se requiere una alarma basada en métricas de una aplicación.|Recopila telemetría y ofrece reglas de alerta.
activity|Azure Activity Log|Se quiere identificar quién cambió el tamaño de una VM mediante el plano de administración.|Registra operaciones del plano de control de Azure.
advisor|Azure Advisor|Se quieren recomendaciones de optimización basadas en recursos existentes.|Analiza recursos y propone mejoras de costo, fiabilidad y otras categorías.
health|Azure Service Health|Un equipo quiere saber si un incidente de Azure afecta sus suscripciones.|Notifica incidentes y mantenimiento relevantes para los servicios usados.
backupaz|Azure Backup|Se necesita recuperar una VM desde un punto conservado según una política.|Administra respaldos y puntos de recuperación de recursos admitidos.
arc|Azure Arc|Se quiere gestionar un servidor local desde el plano de administración de Azure.|Representa recursos externos en Azure para aplicar administración híbrida.
# Azure data
blob|Azure Blob Storage|Se quiere guardar un gran volumen de archivos binarios y objetos.|Ofrece almacenamiento de objetos.
sqldb|Azure SQL Database|El equipo necesita una base SQL relacional administrada sin gestionar el sistema operativo.|Proporciona un motor relacional administrado como servicio.
adls|Azure Data Lake Storage Gen2|Un lago de archivos requiere espacio jerárquico y control de acceso por directorios.|Añade un espacio de nombres jerárquico para cargas de analítica.
adf|Azure Data Factory|Un equipo necesita coordinar la extracción y copia periódica entre varios orígenes.|Orquesta canalizaciones de movimiento y transformación de datos.
servicebus|Azure Service Bus|Se quiere mensajería empresarial con colas y confirmación de procesamiento.|Proporciona mensajería administrada con colas y temas.
eventgrid|Azure Event Grid|Un servicio debe reaccionar a la creación de objetos con notificaciones distribuidas por suscripción.|Enruta eventos discretos a suscriptores configurados.
# Azure identity
pim|Entra PIM|Se quiere que los administradores activen un rol por tiempo limitado tras aprobación.|Gestiona la elegibilidad y activación temporal de privilegios.
ca|Conditional Access|Se necesita exigir MFA cuando un acceso cumple condiciones de riesgo definidas.|Evalúa señales del inicio de sesión para aplicar controles.
accessreview|Revisiones de acceso|Los propietarios deben confirmar periódicamente que los invitados todavía requieren acceso.|Permite recertificar pertenencias y permisos.
entitlement|Entitlement Management|Se quiere agrupar recursos y automatizar solicitudes de acceso a un proyecto.|Administra paquetes de acceso y su ciclo de vida.
# Azure sentinel
analyticsrule|Regla de análisis|Una consulta debe crear alertas cuando aparece un patrón de ataque.|Evalúa datos para generar alertas de seguridad.
sentinelworkbook|Workbook|El SOC quiere un panel interactivo que visualice incidentes y tendencias.|Presenta datos y consultas en informes interactivos.
playbook|Playbook|Una automatización debe enriquecer incidentes con reputación de IP mediante Logic Apps.|Ejecuta flujos de respuesta y enriquecimiento.
watchlist|Watchlist|Una lista de activos críticos debe estar disponible para enriquecer consultas de seguridad.|Incorpora conjuntos de referencia para consultar y correlacionar eventos.
# Azure sql
query|Query Store|Una base necesita conservar planes y estadísticas para investigar una regresión de consulta.|Registra historial de consultas, planes y rendimiento.
pitr|Restauración a punto en el tiempo|Se borraron registros por error y se necesita una copia previa al incidente.|Restaura una base a una marca temporal dentro de la retención.
failover|Grupo de conmutación por error|Una aplicación exige un endpoint estable cuando Azure SQL cambia de región primaria.|Coordina replicación y conmutación con puntos de conexión estables.
sqlparams|Consulta parametrizada|Un valor enviado por un usuario debe llegar al motor como dato sin alterar el SQL.|Separa los valores de entrada de la sintaxis ejecutable.
# Azure cosmos
pk|Clave de partición|La aplicación necesita distribuir los documentos y las solicitudes entre particiones.|Determina cómo se distribuyen lógicamente los datos de un contenedor.
ru|Request Unit|El equipo necesita medir el costo de las operaciones de Cosmos DB con una unidad común.|Normaliza el consumo de recursos de cada operación.
ttl|Time to live|Los documentos de sesión deben expirar automáticamente después de un plazo.|Elimina elementos cuando supera el tiempo configurado.
changefeed|Change feed|Un consumidor debe reaccionar a cambios de elementos sin escanear toda la colección.|Expone cambios en el contenedor para procesamiento incremental.
# Azure databricks
unity|Unity Catalog|Se quieren permisos y linaje centralizados de tablas en varios espacios de trabajo.|Gobierna activos de datos e IA en Databricks.
deltamerge|Delta MERGE|Una carga incremental debe actualizar coincidencias e insertar filas nuevas.|Aplica inserciones y actualizaciones condicionales en una tabla Delta.
deltaopt|Delta OPTIMIZE|Una tabla Delta contiene miles de archivos pequeños que perjudican las lecturas.|Compacta archivos para optimizar su distribución física.
autoloader|Auto Loader|Se necesitan ingerir incrementalmente archivos que llegan a almacenamiento en nube.|Detecta archivos nuevos y los procesa de forma incremental.
# Azure desktop
hostpool|Host pool|Un equipo necesita agrupar máquinas que ofrecen escritorios remotos.|Agrupa hosts de sesión de Azure Virtual Desktop.
fslogix|Contenedor de perfil FSLogix|Un perfil de usuario debe acompañar a la persona cuando cambia de host.|Monta perfiles persistentes desde un contenedor.
appgroup|Application group|Se quiere asignar a ciertos usuarios un conjunto de aplicaciones publicadas.|Define los recursos que los usuarios autorizados pueden iniciar.
avdscale|Scaling plan|Un conjunto de hosts debe encender capacidad durante el horario de oficina.|Ajusta la capacidad de un host pool según horarios y demanda.
# Azure sap
hanasr|HANA System Replication|Se necesita replicar la base SAP HANA a otra instancia para alta disponibilidad.|Replica cambios de una base HANA a un sistema secundario.
pacemaker|Pacemaker|Dos servidores Linux deben coordinar el arranque y movimiento de recursos SAP tras fallos.|Administra recursos de clúster de alta disponibilidad en Linux.
hanacert|SKU certificada para SAP HANA|Se necesita elegir una VM admitida para una base HANA de producción.|Valida compatibilidad de cómputo con los requisitos del proveedor.
sapfence|Fencing|Un clúster debe aislar un nodo dudoso antes de permitir que otro escriba.|Aísla nodos para evitar que dos instancias controlen el mismo recurso.
# Azure windows
adds|Active Directory Domain Services|Equipos Windows locales necesitan autenticación de dominio centralizada.|Proporciona servicios de directorio, autenticación y organización de dominio.
gpo|Group Policy|Se quiere distribuir una configuración de seguridad a equipos de una unidad organizativa.|Aplica configuraciones administradas a usuarios y equipos de un dominio.
wfc|Failover Clustering|Un rol de Windows Server debe continuar si falla su nodo activo.|Coordina nodos y mueve roles cuando ocurre un fallo.
hyperv|Hyper-V|Un servidor físico Windows debe alojar varias máquinas virtuales.|Proporciona un hipervisor para ejecutar máquinas virtuales.
# Azure copilot
customconnector|Conector personalizado|Copilot Studio debe consumir operaciones de un API interno definido por la organización.|Expone operaciones de una API con parámetros y autenticación configurables.
kno|Origen de conocimiento|Un agente debe responder con información obtenida de manuales corporativos autorizados.|Proporciona contenido que el agente puede consultar para generar respuestas.
topic|Tema de conversación|El diseñador necesita guiar al usuario por pasos cuando declara una intención específica.|Define un flujo conversacional con disparadores, preguntas y acciones.
environment|Entorno de Power Platform|Se necesitan separar los agentes de desarrollo y producción con sus propios recursos.|Agrupa y aísla recursos de Power Platform dentro de límites administrativos.
# AWS ai
bedrock|Amazon Bedrock|Un equipo quiere invocar modelos fundacionales administrados de varios proveedores mediante un servicio de AWS.|Proporciona acceso administrado a modelos fundacionales y herramientas para construir aplicaciones generativas.
guardrails|Bedrock Guardrails|El equipo debe bloquear temas prohibidos tanto en entradas como en salidas de un asistente.|Aplica filtros y políticas sobre interacciones con modelos.
sagemaker|Amazon SageMaker AI|Un equipo necesita administrar trabajos de entrenamiento de modelos propios con contenedores y aceleradores.|Proporciona infraestructura administrada para entrenar y desplegar modelos de aprendizaje automático.
batch|SageMaker Batch Transform|Se necesitan predicciones para un archivo de registros cada noche sin mantener un endpoint permanente.|Ejecuta inferencia sobre conjuntos de datos mediante trabajos por lotes.
textract|Amazon Textract|Se quieren extraer campos y tablas de formularios escaneados.|Detecta texto, tablas y campos en documentos.
rekognition|Amazon Rekognition|Un archivo de video requiere etiquetas de objetos y detección de contenido visual.|Analiza imágenes y videos con modelos de visión administrados.
# Azure ai
docintel|Azure AI Document Intelligence|El equipo necesita extraer importes y proveedores de facturas con distintos diseños.|Extrae texto y campos estructurados de documentos.
search|Azure AI Search|Un asistente necesita buscar pasajes relevantes por coincidencia textual y cercanía de vectores.|Proporciona un índice de búsqueda con consultas híbridas.
speech|Azure AI Speech|Una aplicación debe transcribir una conversación grabada a texto.|Ofrece reconocimiento de voz y síntesis de voz.
vision|Azure AI Vision|El equipo necesita generar descripciones y detectar objetos en fotografías.|Analiza contenido visual mediante capacidades de visión artificial.
contentsafety|Azure AI Content Safety|El equipo necesita puntuar contenido dañino antes de mostrarlo a usuarios.|Detecta categorías de contenido potencialmente dañino.
mlstudio|Azure Machine Learning|Se necesitan trabajos reproducibles de entrenamiento y despliegue de modelos propios.|Gestiona ejecuciones, artefactos y despliegues de aprendizaje automático.
# AWS dev
sqs|Amazon SQS|El productor necesita acumular tareas mientras los trabajadores se recuperan de una caída.|Desacopla productores y consumidores mediante colas.
sns|Amazon SNS|Una notificación debe enviarse a varios endpoints cada vez que se publica en un tema.|Distribuye notificaciones mediante un modelo de publicación y suscripción.
eventbridge|Amazon EventBridge|Los eventos de distintos servicios deben dirigirse según patrones del contenido del evento.|Enruta eventos de orígenes conectados a destinos mediante reglas.
step|AWS Step Functions|Un flujo necesita coordinar pasos, ramas y reintentos con estado visible.|Orquesta operaciones mediante máquinas de estados.
# Azure dev
logic|Azure Logic Apps|Un equipo quiere automatizar un proceso de aprobación utilizando conectores visuales.|Orquesta flujos de integración mediante disparadores, acciones y conectores.
apim|Azure API Management|Se necesita aplicar límites de solicitudes y políticas a APIs publicadas para clientes.|Administra la exposición de APIs a través de una puerta de enlace con políticas.
acr|Azure Container Registry|La organización necesita almacenar imágenes de contenedores en un registro privado.|Aloja artefactos e imágenes de contenedores con acceso controlado.
appconfig|Azure App Configuration|Varias aplicaciones deben consultar indicadores de funciones desde una ubicación común.|Centraliza parámetros y feature flags para aplicaciones.
# AZ-104 identity
locks|Bloqueo CanNotDelete|Un grupo de recursos debe seguir permitiendo cambios, pero debe impedir el borrado accidental.|Evita operaciones de eliminación en el plano de administración.
scope|Rol en el grupo de recursos|Un operador debe administrar máquinas de un solo grupo sin tener acceso de administración al resto de la suscripción.|Limita la asignación de Azure RBAC a los recursos del grupo.
policyassign|Asignación de Azure Policy|Una suscripción debe rechazar la creación de recursos fuera de las regiones aprobadas.|Aplica una definición de directiva a un ámbito.
budget|Presupuesto de Azure Cost Management|Finanzas quiere recibir alertas cuando el gasto previsto supere el límite mensual.|Supervisa costos reales o previstos respecto de umbrales.
# AZ-104 data
sas|SAS de delegación de usuario|Una aplicación debe compartir temporalmente un blob con permiso de lectura, usando una firma respaldada por Microsoft Entra.|Delega acceso limitado a Blob Storage mediante una clave de delegación de usuario.
blobsoft|Eliminación temporal de blobs|Un operador debe recuperar un blob eliminado por error durante el período de retención.|Conserva blobs eliminados durante un plazo configurable.
lifecycle|Directiva de ciclo de vida de blobs|Los blobs sin uso deben pasar a un nivel más económico después de un número de días.|Automatiza cambios de nivel o eliminaciones mediante reglas.
zrs|Almacenamiento con redundancia de zona|Una cuenta debe mantener copias de datos en varias zonas de la misma región.|Replica sincrónicamente datos entre zonas de disponibilidad de una región.
azcopy|AzCopy|Una tarea de consola debe transferir miles de archivos locales a un contenedor de blobs.|Copia archivos hacia y desde Azure Storage por línea de comandos.
# AZ-104 compute
bicep|Plantilla Bicep|Un equipo necesita declarar recursos y parámetros de Azure en un archivo reutilizable.|Describe infraestructura declarativa para Azure Resource Manager.
extension|Extensión de script personalizado|Una VM debe descargar y ejecutar un script de configuración tras el despliegue.|Ejecuta scripts de configuración por medio del agente de la máquina virtual.
slot|Ranura de implementación de App Service|Un equipo quiere validar una nueva versión en una URL de preparación y después intercambiarla con producción.|Mantiene un entorno de implementación que se puede intercambiar con otra ranura.
autoscale|Escalado automático de VM Scale Sets|El número de instancias de un conjunto debe aumentar cuando sube la CPU promedio.|Ajusta el número de instancias mediante reglas basadas en métricas.
# AZ-104 network
peering|Emparejamiento de redes virtuales|Dos VNet con espacios de direcciones distintos necesitan comunicarse por IP privada a través de la red troncal de Azure.|Conecta redes virtuales mediante rutas privadas sobre la red troncal.
udr|Ruta definida por el usuario|Una subred debe enviar su tráfico saliente a una aplicación virtual de red como siguiente salto.|Permite elegir explícitamente el siguiente salto para un prefijo.
ipflow|Verificación de flujo IP|Un administrador quiere identificar qué regla de NSG permite o deniega un flujo TCP hacia una VM.|Comprueba el resultado y la regla de seguridad aplicable para un flujo concreto.
azlb|Azure Load Balancer|Varias máquinas deben recibir tráfico TCP a través de una IP frontal y una sonda de estado.|Distribuye tráfico de capa cuatro entre destinos que responden a la sonda.
privdns|Vínculo de zona DNS privada|Las máquinas de otra VNet deben resolver los nombres de una zona DNS privada de Azure.|Asocia una zona privada con una red virtual para resolver sus registros.
# AZ-104 ops
diag|Configuración de diagnóstico|Los registros de recursos de una cuenta de almacenamiento deben enviarse a Log Analytics.|Enruta registros y métricas de recursos a destinos configurados.
actiongroup|Grupo de acciones|Cuando se dispara una alerta de Azure Monitor, debe enviarse un correo al equipo de guardia.|Define destinatarios y acciones reutilizables para alertas.
vault|Almacén de Recovery Services|Un administrador necesita almacenar y administrar puntos de recuperación de máquinas virtuales respaldadas.|Administra elementos y puntos de recuperación para Azure Backup.
kql|Consulta KQL en Log Analytics|Un equipo debe filtrar y agregar registros de varias máquinas para investigar un incidente.|Permite consultar tablas de registros mediante filtros y agregaciones.
sitefail|Conmutación de Azure Site Recovery|Una aplicación replicada debe iniciar sus máquinas en la región de recuperación durante una interrupción.|Activa las cargas replicadas en el destino de recuperación.
restoredisk|Restauración de discos de VM|Un operador necesita recuperar los discos desde un punto de respaldo para examinarlos sin reemplazar la VM original.|Recupera discos como recursos separados para inspección o reconstrucción.
`;
buildPracticeBanks(practiceFacts);
