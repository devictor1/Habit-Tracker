import { useState } from 'react';

function HabitTracker() {
    const [habitos, setHabitos] = useState([]);
    const [novoHabito, setNovoHabito] = useState("");
    const [horario, setHorario] = useState("");
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
        const horarioRegex = /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;
        if (!horarioRegex.test(horario)) {
            setErro("O horário deve estar no formato HH:MM (ex: 14:30)");
            return;
        }
        if (!categoriaSelecionada){
            setErro("Selecione uma categoria!");
            return;
        }
        

        const novoHabit = {
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
    }

    const deletarHabito = (index) => {
        const novosHabitos = [...habitos];
        novosHabitos.splice(index, 1);
        setHabitos(novosHabitos);
    }
    const gerarResumoSemana = () => {
        const resumo = {};
        habitos.forEach(habito => {
            habito.dias.forEach(dia => {
                if (!resumo[dia]) {
                    resumo[dia] = [];
                }
                resumo[dia].push(`Na categoria (${habito.categoria}), ${habito.nome} às ${habito.horario}`);
            });
        });
        return resumo;
    };

    const resumoSemana = gerarResumoSemana();

    return (
        <>
            <h1>Gerenciador de Hábitos</h1>

            <div>
                <h2>Adicionar Categoria</h2>
                <input
                    type="text"
                    value={novaCategoria}
                    onChange={(e) => setNovaCategoria(e.target.value)}
                    placeholder="Nova Categoria"
                />
                <button onClick={adicionarCategoria}>Adicionar Categoria</button>
                {erroC && <p style={{ color: 'red' }}>{erroC}</p>}
                {categorias.length > 0 && (
        <div>
            <h3>Categorias Criadas:</h3>
            <ul>
                {categorias.map((categoria, index) => (
                    <li key={index}>{categoria}</li>
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
                    />
                    <input
                        type="text"
                        value={horario}
                        onChange={(e) => setHorario(e.target.value)}
                        placeholder="Horário (ex: 18:00)"
                    />
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
                    <ul>
                        {habitos.map((habito, index) => (
                            <li key={index}>
                                {habito.categoria} - {habito.nome} - {habito.horario} - Dias: {habito.dias.join(', ')}{' '}
                                <button onClick={() => deletarHabito(index)}>Deletar Hábito</button>
                            </li>
                        ))}
                    </ul>
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