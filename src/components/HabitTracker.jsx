import { useState } from 'react';

function HabitTracker() {
    /*Variáveis utilizadas*/
    const [nextId, setNextId] = useState(1);
    const [habitos, setHabitos] = useState([]);
    const [novoHabito, setNovoHabito] = useState("");
    const [erro, setErro] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [novaCategoria, setNovaCategoria] = useState("");
    const [erroC, setErroC] = useState("");
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
    const [dias, setDias] = useState({
        Segunda: false,
        Terça: false,
        Quarta: false,
        Quinta: false,
        Sexta: false,
        Sábado: false,
        Domingo: false,
    });
    const [isCollapsed, setIsCollapsed] = useState(true);
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };
    const [horario,setHorario] = useState("");
    const horarios = [
    "00:00", "00:15", "00:30", "00:45",
    "01:00", "01:15", "01:30", "01:45",
    "02:00", "02:15", "02:30", "02:45",
    "03:00", "03:15", "03:30", "03:45",
    "04:00", "04:15", "04:30", "04:45",
    "05:00", "05:15", "05:30", "05:45",
    "06:00", "06:15", "06:30", "06:45",
    "07:00", "07:15", "07:30", "07:45",
    "08:00", "08:15", "08:30", "08:45",
    "09:00", "09:15", "09:30", "09:45",
    "10:00", "10:15", "10:30", "10:45",
    "11:00", "11:15", "11:30", "11:45",
    "12:00", "12:15", "12:30", "12:45",
    "13:00", "13:15", "13:30", "13:45",
    "14:00", "14:15", "14:30", "14:45",
    "15:00", "15:15", "15:30", "15:45",
    "16:00", "16:15", "16:30", "16:45",
    "17:00", "17:15", "17:30", "17:45",
    "18:00", "18:15", "18:30", "18:45",
    "19:00", "19:15", "19:30", "19:45",
    "20:00", "20:15", "20:30", "20:45",
    "21:00", "21:15", "21:30", "21:45",
    "22:00", "22:15", "22:30", "22:45",
    "23:00", "23:15", "23:30", "23:45"
];
    /*Funções do aplicativo*/
    const adicionarCategoria = () => {
        if (novaCategoria.trim() === "") {
            setErroC("A categoria não pode estar vazia!");
            return;
        }
        setCategorias([...categorias, novaCategoria]);
        setNovaCategoria("");
        setErroC("");
    };

    const criarHabito = () => {
        if (novoHabito.trim() === "" || horario.trim() === "" || Object.keys(dias).length === 0) {
            setErro("Preencha todos os campos!");
            return;
        }
        if (novoHabito.length<6){
            setErro("O nome deve ter no mínimo 6 letras");
            return;
        }
        

        const novoHabit = {
            id: nextId,
            categoria: categoriaSelecionada,
            nome: novoHabito,
            horario: horario,
            dias: Object.keys(dias).filter(dia => dias[dia])
        };

        setHabitos([...habitos, novoHabit]);
        setNovoHabito("");
        setHorario("");
        setDias({});
        setCategoriaSelecionada("");
        setErro("");
        setNextId(prevId => prevId + 1);
    }

    const deletarHabito = (id) => {
        const novosHabitos = habitos.filter(habito => habito.id !== id);
        setHabitos(novosHabitos);
    }
    const deletarCategoria = (index) => {
        const novasCategorias = [...categorias];
        novasCategorias.splice(index, 1);
        setCategorias(novasCategorias);
    }
    const gerarResumoSemana = () => {
        const resumo = {};
        const diasDaSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"]
        habitos.forEach(habito => {
            habito.dias.forEach(dia => {
                if (!resumo[dia]) {
                    resumo[dia] = [];
                }
                resumo[dia].push(`Na categoria (${habito.categoria}), ${habito.nome} às ${habito.horario}`);
            });
        });
        const resumoOrdenado = {};
        diasDaSemana.forEach(dia => {
            if (resumo[dia]) {
                resumoOrdenado[dia] = resumo[dia];
                }
        });
        return resumoOrdenado;
    };

    return (/*Interface do Aplicativo*/
        <>
            <h1>Gerenciador de Hábitos</h1>

            <div>
                <h2>Adicionar Categoria</h2>
                <input
                    type="text"
                    value={novaCategoria}
                    onChange={(e) => setNovaCategoria(e.target.value)}
                    placeholder="Nova Categoria"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            adicionarCategoria();
                        }
                    }}
                />
                <button onClick={adicionarCategoria}>Adicionar Categoria</button>
                {erroC && <p style={{ color: 'red' }}>{erroC}</p>}
                {categorias.length > 0 && (
        <div>
            <h3>Categorias Criadas:</h3>
            <ul>
                {categorias.map((categoria, index) => (
                    <li key={index}>{categoria}{' '}
                    <button onClick={() => deletarCategoria(index)}>Deletar Categoria</button>
                    </li>
                ))}
            </ul>
        </div>
    )}
</div>
            {categorias.length === 0 ? (
                <p>Adicione uma categoria para começar a criar hábitos.</p>
            ) : (
                <>
                    <h2>Lista de Hábitos</h2>
                    <input
                        type="text"
                        value={novoHabito}
                        onChange={(e) => setNovoHabito(e.target.value)}
                        placeholder="Adicione um novo Hábito"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                criarHabito();
                            }
                        }}
                    />
                    <div>
            <label htmlFor="horario">Escolha um horário:</label>
            <select
                id="horario"
                value={horario}
                onChange={(e) => setHorario(e.target.value)}
            >
                <option value="">Selecione um horário</option>
                {horarios.map((h, index) => (
                    <option key={index} value={h}>{h}</option>
                ))}
            </select>
            {horario && <p>Você selecionou: {horario}</p>}
        </div>
                    <div>
                        <h4>Selecione os dias:</h4>
                        {["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"].map(dia => (
                            <label key={dia}>
                                <input
                                    type="checkbox"
                                    value={dia}
                                    checked={dias[dia] || false}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setDias(prev => ({ ...prev, [value]: e.target.checked }));
                                    }}
                                />
                                {dia}
                            </label>
                        ))}
                    </div>
                    <div>
                        <h4>Selecione uma Categoria:</h4>
                        <select 
                            value={categoriaSelecionada} 
                            onChange={(e) => setCategoriaSelecionada(e.target.value)}
                        >
                            <option value="">Selecione uma categoria</option>
                            {categorias.map((categoria, index) => (
                                <option key={index} value={categoria}>{categoria}</option>
                            ))}
                        </select>
                    </div>
                    <button onClick={criarHabito}>Criar Novo Hábito</button>
                    {erro && <p style={{ color: 'red' }}>{erro}</p>}
                    <button onClick={toggleCollapse}>
                {isCollapsed ? 'Mostrar Hábitos' : 'Ocultar Hábitos'}
            </button>
            {!isCollapsed && (
                <ul>
                    {habitos.map((habito, index) => (
                        <li key={habito.id}>
                             {habito.id} - {habito.categoria} - {habito.nome} - {habito.horario} - Dias: {habito.dias.join(', ')}{' '}
                            <button onClick={() => deletarHabito(habito.id)}>Deletar Hábito</button>
                        </li>
                    ))}
                </ul>
            )}
                    <h2>Resumo da Semana</h2>
                    <div>
                        {Object.entries(gerarResumoSemana()).map(([dia, habitos]) => (
                            <div key={dia}>
                                <h4>{dia}:</h4>
                                <ul>
                                    {habitos.map((habito, index) => (
                                        <li key={index}>{habito}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    );
}

export default HabitTracker;