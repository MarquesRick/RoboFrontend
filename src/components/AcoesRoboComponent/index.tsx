import { useState } from "react";
import { api } from "../../services/api";
import useDidMountEffect from "../../helper/useDidMountEffect";
import {
  Cotovelo,
  Inclinacao,
  Pulso,
  Rotacao,
  TipoAcao,
} from "../../models/Acao/AcaoEnum";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RoboModel } from "../../models/Robo/RoboModel";
import { AcaoModel } from "../../models/Acao/AcaoModel";
export default () => {
  const [dataRobot, setDataRobot] = useState<RoboModel>({
    id: 0,
    cabecaInclinacao: 0,
    cotoveloEsquerdo: 0,
    cotoveloDireito: 0,
    pulsoEsquerdo: 0,
    pulsoDireito: 0,
    cabecaRotacao: 0,
  });
  const [showToast, setShowToast] = useState<boolean>(false);
  const [dataActions, setDataActions] = useState<AcaoModel[]>([]);
  const [apiAway, setApiAway] = useState<boolean>(false);

  useDidMountEffect(() => {
    getAllRobot();
    getAllActions();
    setShowToast(false);
  }, []);

  const getAllRobot = async () =>
    await api
      .get<RoboModel>(`/Robo/GetById/1`)
      .then((response) => {
        setDataRobot(response.data);
      })
      .catch((error: any) => {
        console.error(error);
        setApiAway(true);
      });

  const getAllActions = async () =>
    await api
      .get<AcaoModel[]>(`/Acoes/GetAllAcoes`)
      .then((response) => {
        setDataActions(response.data);
      })
      .catch((error: any) => {
        console.error(error);
        setApiAway(true);
      });

  const showOptions = (
    indexOption: number,
    comparisonItem: number,
    itemOption: AcaoModel
  ) => {
    if (itemOption === null || itemOption === undefined) return <></>;

    if (
      itemOption.id == comparisonItem - 1 ||
      itemOption.id == comparisonItem + 1 ||
      itemOption.id == comparisonItem
    )
      return (
        <option key={indexOption} value={itemOption.id}>
          {itemOption.descricao}
        </option>
      );
  };

  const handleOnSubmit = async () => {
    await api
      .put<RoboModel>(`/Robo/UpdateRobo`, dataRobot)
      .then((response) => {
        setShowToast(true);
        toast.success(
          <div>
            Sucesso!
            <br />
            <br />
            Robô atualizado com sucesso!
          </div>,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            style: { fontSize: "10pt" },
          }
        );
        console.log("update", response);
        setDataRobot(response.data);
        console.log("data actions", response.data);
      })
      .catch((error: any) => {
        setShowToast(true);
        let messsage =
          error.response.data.status == 400 ? (
            <div>
              Erro!
              <br />
              <br />
              {error.response.data.errors.Validacao}
            </div>
          ) : (
            <div>
              Erro Interno!
              <br />
              <br />
              Por gentileza, entrar em contato com nosso TI.
            </div>
          );
        toast.error(messsage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: { fontSize: "10pt" },
        });
      });
  };

  const handleOnReset = async () => {
    await api
      .get<RoboModel>(`/Robo/GetReset/${dataRobot.id}`)
      .then((response) => {
        setShowToast(true);
        toast.success(
          <div>
            Sucesso!
            <br />
            <br />
            Robô resetado com sucesso!
          </div>,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            style: { fontSize: "10pt" },
          }
        );
        setDataRobot(response.data);
      })
      .catch((error: any) => {
        setShowToast(true);
        let messsage =
          error.response.data.status == 400 ? (
            <div>
              Erro!
              <br />
              <br />
              {error.response.data.errors.Validacao}
            </div>
          ) : (
            <div>
              Erro Interno!
              <br />
              <br />
              Por gentileza, entrar em contato com nosso TI.
            </div>
          );
        toast.error(messsage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: { fontSize: "10pt" },
        });
      });
  };

  return (
    <>
      {showToast && <ToastContainer />}
      {apiAway ? (
        <>
          <h2
            className="text-danger"
            style={{
              position: "absolute",
              top: "50%",
              marginTop: "-50px",
              marginLeft: "-50px",
              width: "500px",
              height: "100px",
            }}
          >
            Parece que a API está fora {":("} <br />
            <br />
            Por gentileza, rodar a API para utilizar o sistema
          </h2>
        </>
      ) : (
        <form className="container" noValidate>
          <div className="row mt-4">
            <h4 style={{ textAlign: "center", marginTop: "14px" }}>
              Cabeça Robô
            </h4>
          </div>

          <div
            style={{
              textAlign: "center",
              margin: "1rem",
            }}
          >
            <div
              style={{
                display: "inline-block",
                verticalAlign: "middle",
                padding: "1rem 1rem",
              }}
            >
              <label htmlFor="cabecaInclinacao" className="form-label">
                Cabeça Inclinação
              </label>
              <select
                className={"form-select bg-transparent form-control"}
                id="cabecaInclinacao"
                aria-label="cabecaInclinacao"
                value={dataRobot?.cabecaInclinacao}
                onChange={(e) => {
                  if (parseInt(e.target.value) === Inclinacao.ParaBaixo)
                    setDataRobot({
                      ...dataRobot,
                      cabecaInclinacao: Number(e.target.value),
                      cabecaRotacao: Rotacao.Repouso,
                    });
                  else
                    setDataRobot({
                      ...dataRobot,
                      cabecaInclinacao: Number(e.target.value),
                    });
                }}
              >
                {dataActions.map((item, index) => {
                  if (item.tipoAcao === TipoAcao.Inclinacao)
                    return showOptions(
                      index,
                      Number(dataRobot?.cabecaInclinacao || 0),
                      item
                    );
                })}
              </select>
            </div>
            <div
              style={{
                display: "inline-block",
                verticalAlign: "middle",
                padding: "1rem 1rem",
              }}
            >
              <label htmlFor="cabecaRotacao" className="form-label">
                Cabeça Rotação
              </label>
              <select
                className={"form-select bg-transparent form-control"}
                id="cabecaRotacao"
                aria-label="cabecaRotacao"
                value={dataRobot?.cabecaRotacao}
                disabled={dataRobot?.cabecaInclinacao === Inclinacao.ParaBaixo}
                onChange={(e) =>
                  setDataRobot({
                    ...dataRobot,
                    cabecaRotacao: Number(e.target.value),
                  })
                }
              >
                {dataActions.map((item, index) => {
                  if (item.tipoAcao === TipoAcao.Rotacao) {
                    return showOptions(
                      index,
                      Number(dataRobot?.cabecaRotacao || 0),
                      item
                    );
                  }
                })}
              </select>
            </div>
          </div>

          <hr />
          <div className="row mt-4">
            <h4 style={{ textAlign: "center" }}>Braços Robô</h4>
          </div>

          <div
            style={{
              textAlign: "center",
              margin: "1rem",
            }}
          >
            <div
              style={{
                display: "inline-block",
                verticalAlign: "middle",
                padding: "1rem 1rem",
              }}
            >
              <div className="row">
                <label htmlFor="cotoveloEsquerdo" className="form-label">
                  Cotovelo Esquerdo
                </label>
                <select
                  className={"form-select bg-transparent form-control"}
                  id="cotoveloEsquerdo"
                  aria-label="cotoveloEsquerdo"
                  value={dataRobot?.cotoveloEsquerdo}
                  onChange={(e) => {
                    if (
                      parseInt(e.target.value) !== Cotovelo.FortementeContraido
                    )
                      setDataRobot({
                        ...dataRobot,
                        cotoveloEsquerdo: Number(e.target.value),
                        pulsoEsquerdo: Pulso.Repouso,
                      });
                    else
                      setDataRobot({
                        ...dataRobot,
                        cotoveloEsquerdo: Number(e.target.value),
                      });
                  }}
                >
                  {dataActions.map((item, index) => {
                    if (item.tipoAcao === TipoAcao.Cotovelo)
                      return showOptions(
                        index,
                        Number(dataRobot?.cotoveloEsquerdo || 0),
                        item
                      );
                  })}
                </select>
              </div>
            </div>
            <div
              style={{
                display: "inline-block",
                verticalAlign: "middle",
                padding: "1rem 1rem",
              }}
            >
              <div className="row">
                <label htmlFor="pulsoEsquerdo" className="form-label">
                  Pulso Esquerdo
                </label>
                <select
                  className={
                    "form-select bg-transparent form-control form-invalid"
                  }
                  id="pulsoEsquerdo"
                  disabled={
                    dataRobot?.cotoveloEsquerdo != Cotovelo.FortementeContraido
                  }
                  aria-label="pulsoEsquerdo"
                  value={dataRobot?.pulsoEsquerdo}
                  onChange={(e) =>
                    setDataRobot({
                      ...dataRobot,
                      pulsoEsquerdo: Number(e.target.value),
                    })
                  }
                >
                  {dataActions.map((item, index) => {
                    if (item.tipoAcao === TipoAcao.Pulso)
                      return showOptions(
                        index,
                        Number(dataRobot?.pulsoEsquerdo || 0),
                        item
                      );
                  })}
                </select>
                {dataRobot?.cotoveloEsquerdo !=
                  Cotovelo.FortementeContraido && (
                  <small
                    style={{ fontSize: "15px" }}
                    id="passwordHelp"
                    className="text-danger"
                  >
                    Cotovelo Esquerdo deve estar Fortemente Contraído para que o
                    Pulso Esquerdo possa ser movimentado.
                  </small>
                )}
              </div>
            </div>
          </div>

          <div
            style={{
              textAlign: "center",
              margin: "1rem",
            }}
          >
            <div
              style={{
                display: "inline-block",
                verticalAlign: "middle",
                padding: "1rem 1rem",
              }}
            >
              <div className="row">
                <label htmlFor="cotoveloDireito" className="form-label">
                  Cotovelo Direito
                </label>
                <select
                  className={"form-select bg-transparent form-control"}
                  id="cotoveloDireito"
                  aria-label="cotoveloDireito"
                  value={dataRobot?.cotoveloDireito}
                  onChange={(e) => {
                    if (
                      parseInt(e.target.value) !== Cotovelo.FortementeContraido
                    )
                      setDataRobot({
                        ...dataRobot,
                        cotoveloDireito: Number(e.target.value),
                        pulsoDireito: Pulso.Repouso,
                      });
                    else
                      setDataRobot({
                        ...dataRobot,
                        cotoveloDireito: Number(e.target.value),
                      });
                  }}
                >
                  {dataActions.map((item, index) => {
                    if (item.tipoAcao === TipoAcao.Cotovelo)
                      return showOptions(
                        index,
                        Number(dataRobot?.cotoveloDireito || 0),
                        item
                      );
                  })}
                </select>
              </div>
            </div>

            <div
              style={{
                display: "inline-block",
                verticalAlign: "middle",
                padding: "1rem 1rem",
              }}
            >
              <div className="row">
                <label htmlFor="pulsoDireito" className="form-label">
                  Pulso Direito
                </label>
                <select
                  disabled={
                    dataRobot?.cotoveloDireito != Cotovelo.FortementeContraido
                  }
                  className={"form-select bg-transparent form-control"}
                  id="pulsoDireito"
                  aria-label="pulsoDireito"
                  value={dataRobot?.pulsoDireito}
                  onChange={(e) =>
                    setDataRobot({
                      ...dataRobot,
                      pulsoDireito:
                        e.target.value !== undefined
                          ? parseInt(e.target.value)
                          : 0,
                    })
                  }
                >
                  {dataActions.map((item, index) => {
                    if (item.tipoAcao === TipoAcao.Pulso)
                      return showOptions(
                        index,
                        Number(dataRobot?.pulsoDireito || 0),
                        item
                      );
                  })}
                </select>
                {dataRobot?.cotoveloDireito != Cotovelo.FortementeContraido && (
                  <small
                    style={{ fontSize: "15px" }}
                    id="passwordHelp"
                    className="text-danger"
                  >
                    Cotovelo Direito deve estar Fortemente Contraído para que o
                    Pulso Direito possa ser movimentado.
                  </small>
                )}
              </div>
            </div>
          </div>

          <div style={{ marginRight: "0" }}>
            <button
              style={{
                width: "100px",
                height: "50px",
                marginRight: "15px",
                marginBottom: "20px",
              }}
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                handleOnSubmit();
              }}
            >
              Salvar
            </button>
            <button
              style={{ width: "100px", height: "50px", marginBottom: "20px" }}
              className="btn btn-secondary"
              onClick={(e) => {
                e.preventDefault();
                handleOnReset();
              }}
            >
              Resetar
            </button>
          </div>
        </form>
      )}
    </>
  );
};
