export interface Vaccine {
 id:string;
 name:string;
 scheduledDate:string;
 appliedDate?:string;
 status:'APLICADA'|'PENDENTE'|'ATRASADA';
}
