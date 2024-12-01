export class AppConstants {
    // URLs de la API
    static readonly BASE_URL: string = 'http://localhost:9090/api/';
    static readonly PROJECT_URL: string = AppConstants.BASE_URL + 'project';
    static readonly TASK_URL: string = AppConstants.BASE_URL + 'task';
  
    // Otros valores constantes
    static readonly DEFAULT_PAGE_SIZE: number = 10;
    static readonly MAX_RETRY_ATTEMPTS: number = 3; 
    static readonly DATE_FORMAT: string = 'YYYY-MM-DD';
    
    // Opciones de configuración
    static readonly IS_DEBUG_MODE: boolean = false;
  }