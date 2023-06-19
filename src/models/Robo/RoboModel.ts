export interface RoboModel {
  id: number;
  cotoveloEsquerdo: number;
  cotoveloDireito: number;
  pulsoEsquerdo: number;
  pulsoDireito: number;
  cabecaRotacao: number;
  cabecaInclinacao: number;
  dataAtualizacao?: string;
  dataCriacao?: string;
}
