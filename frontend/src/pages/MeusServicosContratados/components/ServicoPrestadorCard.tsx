import type { StatusServico } from '../../../models/servico-status.enum';
import type { ServicoPrestadorItem } from '../../../models/servico-prestador.model';

interface ServicoPrestadorCardProps {
  servico: ServicoPrestadorItem;
  processandoId: number | null;
  onAtualizarStatus: (id: number, status: StatusServico) => void;
}

export default function ServicoPrestadorCard({
  servico,
  processandoId,
  onAtualizarStatus,
}: ServicoPrestadorCardProps) {

  // Retorna APENAS o próximo status válido (nunca o mesmo status atual)
  const obterProximoStatus = (statusAtual?: string): StatusServico | null => {
    switch (statusAtual) {
      case 'DISPONIVEL':
        return 'CONTRATADO' as StatusServico; // Requer alteração no Java para liberar
      case 'CONTRATADO':
        return 'EM_ANDAMENTO' as StatusServico;
      case 'EM_ANDAMENTO':
        return 'REALIZADO' as StatusServico;
      default:
        return null;
    }
  };

  const proximoStatus = obterProximoStatus(servico?.status);
  const statusFormatado = (servico?.status ?? '').toLowerCase();

  return (
    <div className="servico-card">
      <h3>{servico?.titulo}</h3>
      <p>{servico?.descricao}</p>

      <span className={`badge status-${statusFormatado}`}>
        {servico?.status ?? 'INDISPONIVEL'}
      </span>

      <div className="card-actions">
        {proximoStatus ? (
          <button
            type="button"
            disabled={processandoId === servico?.id}
            onClick={() => onAtualizarStatus(servico.id, proximoStatus)}
          >
            {processandoId === servico?.id ? 'Atualizando...' : `Avançar para ${proximoStatus}`}
          </button>
        ) : (
          <span className="text-muted">Nenhuma transição disponível</span>
        )}
      </div>
    </div>
  );
}