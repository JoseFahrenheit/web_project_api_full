# Tripleten web_project_api_full

Se hace el proyecto final, en el cual se emplea todo lo aprendido, desde hacer una pagina de inicio de sesion y registro de usuarios, esto para la pagina web de Alrededor de los EE.UU. utilizando Node.js y Express.js y al final lanzarlo a la red, fue creado utilizando node, express y GitHub.

Se toman en cuenta los siguienter puntos:

## Información del Servidor

- **URL Production:** https://around-the-us.chickenkiller.com/
- **Dominio:** around-the-us.chickenkiller.com
- **IP del Servidor:** 34.51.73.139
- **Protocolo:** HTTPS activado con Let's Encrypt
- **Certificado SSL:** Válido hasta 2025-12-22 (renovación automática)
- **Servidor:** Google Cloud Platform
- **Sistema Operativo:** Ubuntu 25.04

## Funcionalidades Implementadas

- ✅ Registro y autenticación de usuarios
- ✅ Gestión de perfiles de usuario
- ✅ Creación y eliminación de tarjetas
- ✅ Sistema de "me gusta" en tarjetas
- ✅ Despliegue en Google Cloud Platform
- ✅ Configuración Nginx como proxy reverso
- ✅ Dominio personalizado con FreeDNS
- ✅ Certificado SSL/TLS con Let's Encrypt
- ✅ Variables de entorno seguras (.env)
- ✅ Process management con PM2
- ✅ Ruta crash-test para pruebas de recuperación

## Acceso

- **Producción (HTTPS):** https://around-the-us.chickenkiller.com/
- **IP directa:** http://34.51.73.139/ (redirige a HTTPS)

## Prueba de Recuperación (Crash Test)

Para probar la recuperación automática de PM2:

- Acceder a: https://around-the-us.chickenkiller.com/crash-test
- PM2 reiniciará automáticamente el servidor en segundos
