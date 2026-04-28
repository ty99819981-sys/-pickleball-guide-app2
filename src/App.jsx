import { useState } from 'react';

// note記事購入者向けアクセスコード(後で変更可能)
const PREMIUM_ACCESS_CODE = "PICKLE2026";

export default function PickleballGuide() {
  const [activeTab, setActiveTab] = useState('basics');
  const [isPremium, setIsPremium] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [paywallFeature, setPaywallFeature] = useState('');

  const openPaywall = (featureName) => {
    setPaywallFeature(featureName);
    setShowPaywall(true);
  };

  const submitAccessCode = (code) => {
    if (code.trim().toUpperCase() === PREMIUM_ACCESS_CODE) {
      setIsPremium(true);
      setShowPaywall(false);
      return true; // 正解
    }
    return false; // 不正解
  };

  const tabs = [
    { id: 'basics', label: '基本ルール', icon: '📋' },
    { id: 'detail', label: '詳細ルール', icon: '📚', premium: true },
    { id: 'court', label: 'コート', icon: '📐' },
    { id: 'simulator', label: 'コール練習', icon: '🎯' },
    { id: 'random', label: '乱数表', icon: '🎲', premium: true },
    { id: 'updates', label: 'ルール改定', icon: '📅', premium: true },
    { id: 'ai', label: 'ルール辞典', icon: '📖' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0a1f14', fontFamily: "'Hiragino Sans', 'Yu Gothic', sans-serif" }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, #1a4d2e 0%, #2d6a4f 100%)',
        padding: '24px 20px 32px',
        borderBottom: '4px solid #ffd60a',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Tennis ball pattern decoration */}
        <div style={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, #d4e157, #9ccc65)',
          opacity: 0.15,
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-30px',
          left: '-30px',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, #ffd60a, #f9a825)',
          opacity: 0.2,
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '11px', letterSpacing: '3px', color: '#ffd60a', fontWeight: 700, marginBottom: '6px' }}>
                PICKLEBALL MASTER GUIDE
              </div>
              <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: 900, margin: 0, letterSpacing: '-0.5px', lineHeight: 1.2 }}>
                ピックルボール<br/>
                <span style={{ color: '#ffd60a' }}>完全ガイド</span>
              </h1>
              <p style={{ color: '#b7e4c7', fontSize: '13px', marginTop: '8px', marginBottom: 0 }}>
                ルール・コート・スコアコール、全部これ一つで
              </p>
            </div>
            {/* プレミアムバッジ */}
            {isPremium ? (
              <div style={{
                background: 'linear-gradient(135deg, #ffd60a 0%, #f9a825 100%)',
                color: '#0a1f14',
                padding: '6px 10px',
                borderRadius: '10px',
                fontSize: '10px',
                fontWeight: 900,
                letterSpacing: '1px',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                boxShadow: '0 2px 8px rgba(255, 214, 10, 0.4)',
              }}>
                <span>💎</span>
                <span>PREMIUM</span>
              </div>
            ) : (
              <button
                onClick={() => openPaywall('プレミアム版にアップグレード')}
                style={{
                  background: 'rgba(255, 214, 10, 0.15)',
                  border: '1px solid #ffd60a',
                  color: '#ffd60a',
                  padding: '6px 10px',
                  borderRadius: '10px',
                  fontSize: '10px',
                  fontWeight: 800,
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span>🔓</span>
                <span>無料版</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav style={{
        background: '#0a1f14',
        padding: '12px 8px',
        display: 'flex',
        gap: '6px',
        overflowX: 'auto',
        borderBottom: '1px solid #1a4d2e',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        {tabs.map(tab => {
          const isLocked = tab.premium && !isPremium;
          return (
            <button
              key={tab.id}
              onClick={() => {
                if (isLocked) {
                  openPaywall(tab.label);
                } else {
                  setActiveTab(tab.id);
                }
              }}
              style={{
                padding: '10px 14px',
                borderRadius: '10px',
                border: 'none',
                background: activeTab === tab.id ? '#ffd60a' : 'transparent',
                color: activeTab === tab.id ? '#0a1f14' : (isLocked ? '#6b7c6f' : '#b7e4c7'),
                fontWeight: 700,
                fontSize: '13px',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontFamily: 'inherit',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                position: 'relative',
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
              {isLocked && (
                <span style={{
                  fontSize: '10px',
                  color: '#ffd60a',
                  marginLeft: '2px',
                }}>🔒</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Content */}
      <main style={{ padding: '20px 16px 60px', color: '#fff' }}>
        {activeTab === 'basics' && <BasicsTab />}
        {activeTab === 'detail' && (isPremium ? <DetailTab setActiveTab={setActiveTab} /> : <PaywallScreen featureName="詳細ルール" onUnlock={() => openPaywall('詳細ルール')} description="サーブ・キッチン・スコア・ラリーの全ルールを徹底解説。フォルト判定や2026年改定まで完全網羅。" icon="📚" />)}
        {activeTab === 'court' && <CourtTab />}
        {activeTab === 'simulator' && <SimulatorTab isPremium={isPremium} openPaywall={openPaywall} />}
        {activeTab === 'random' && (isPremium ? <RandomTab /> : <PaywallScreen featureName="乱数表" onUnlock={() => openPaywall('乱数表')} description="ダブルスのペア決めを自動生成。同じ人との連続ペアを避け、公平な対戦表を作成。" icon="🎲" />)}
        {activeTab === 'updates' && (isPremium ? <UpdatesTab /> : <PaywallScreen featureName="ルール改定履歴" onUnlock={() => openPaywall('ルール改定履歴')} description="2021年〜2026年の年別ルール改定を網羅。新ルールにいつから対応したかが一目瞭然。" icon="📅" />)}
        {activeTab === 'ai' && <AIRefereeTab isPremium={isPremium} openPaywall={openPaywall} />}
      </main>

      {/* ペイウォールモーダル */}
      {showPaywall && (
        <PaywallModal
          featureName={paywallFeature}
          onClose={() => setShowPaywall(false)}
          onSubmitCode={submitAccessCode}
        />
      )}
    </div>
  );
}

// ==================== ペイウォール ====================
function PaywallScreen({ featureName, description, icon, onUnlock }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      padding: '20px',
      textAlign: 'center',
    }}>
      <div style={{
        fontSize: '72px',
        marginBottom: '12px',
        filter: 'grayscale(0.5)',
        opacity: 0.7,
      }}>
        {icon}
      </div>

      <div style={{
        background: 'rgba(255, 214, 10, 0.1)',
        border: '1px solid #ffd60a',
        borderRadius: '20px',
        padding: '4px 14px',
        fontSize: '11px',
        color: '#ffd60a',
        fontWeight: 900,
        letterSpacing: '2px',
        marginBottom: '14px',
      }}>
        🔒 PREMIUM
      </div>

      <h2 style={{
        fontSize: '22px',
        fontWeight: 900,
        color: '#fff',
        margin: '0 0 10px',
      }}>
        {featureName}
      </h2>

      <p style={{
        fontSize: '14px',
        color: '#b7e4c7',
        lineHeight: 1.6,
        margin: '0 0 24px',
        maxWidth: '300px',
      }}>
        {description}
      </p>

      <button
        onClick={onUnlock}
        style={{
          padding: '16px 32px',
          background: 'linear-gradient(135deg, #ffd60a 0%, #f9a825 100%)',
          border: 'none',
          borderRadius: '14px',
          color: '#0a1f14',
          fontSize: '15px',
          fontWeight: 900,
          cursor: 'pointer',
          fontFamily: 'inherit',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 4px 16px rgba(255, 214, 10, 0.4)',
        }}
      >
        <span>🔓</span>
        <span>note記事で全機能解放</span>
      </button>

      <p style={{
        fontSize: '11px',
        color: '#6b7c6f',
        marginTop: '14px',
      }}>
        ¥980で記事+アプリ全機能・買い切り
      </p>
    </div>
  );
}

function PaywallModal({ featureName, onClose, onSubmitCode }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    const success = onSubmitCode(code);
    if (!success) {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      padding: '16px',
    }}
    onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(180deg, #1a4d2e 0%, #0a1f14 100%)',
          borderRadius: '20px 20px 12px 12px',
          padding: '24px 20px',
          width: '100%',
          maxWidth: '420px',
          maxHeight: '85vh',
          overflowY: 'auto',
          border: '2px solid #ffd60a',
          boxShadow: '0 -10px 40px rgba(255, 214, 10, 0.2)',
        }}>
        {/* ハンドル */}
        <div style={{
          width: '40px',
          height: '4px',
          background: '#2d6a4f',
          borderRadius: '2px',
          margin: '0 auto 16px',
        }} />

        {/* バッジ */}
        <div style={{
          textAlign: 'center',
          marginBottom: '16px',
        }}>
          <div style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #ffd60a 0%, #f9a825 100%)',
            color: '#0a1f14',
            padding: '6px 14px',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: 900,
            letterSpacing: '2px',
          }}>
            💎 PREMIUM
          </div>
        </div>

        <h2 style={{
          fontSize: '20px',
          fontWeight: 900,
          color: '#fff',
          textAlign: 'center',
          margin: '0 0 8px',
        }}>
          プレミアム版にアップグレード
        </h2>

        <p style={{
          fontSize: '13px',
          color: '#b7e4c7',
          textAlign: 'center',
          margin: '0 0 20px',
          lineHeight: 1.5,
        }}>
          「{featureName}」を含む<br/>
          すべての機能を解放
        </p>

        {/* 機能一覧 */}
        <div style={{
          background: '#143d24',
          borderRadius: '14px',
          padding: '16px',
          marginBottom: '20px',
          border: '1px solid #2d6a4f',
        }}>
          <div style={{
            fontSize: '11px',
            letterSpacing: '2px',
            color: '#ffd60a',
            fontWeight: 800,
            marginBottom: '10px',
          }}>
            ✨ 解放される機能
          </div>
          <PaywallFeature icon="📚" text="詳細ルール 4カテゴリ完全解説" />
          <PaywallFeature icon="🎯" text="コール練習 無制限" />
          <PaywallFeature icon="🎮" text="クイズモード 連続出題" />
          <PaywallFeature icon="🎲" text="乱数表でダブルスペア決め" />
          <PaywallFeature icon="📖" text="ルール辞典 全59項目" />
          <PaywallFeature icon="📅" text="ルール改定履歴 2021〜2026" />
          <PaywallFeature icon="🚫" text="広告なし・一度買えば永久利用" last />
        </div>

        {/* note記事誘導カード */}
        <div style={{
          background: 'linear-gradient(135deg, #ffd60a 0%, #f9a825 100%)',
          borderRadius: '14px',
          padding: '18px',
          marginBottom: '16px',
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: '11px',
            color: '#0a1f14',
            fontWeight: 800,
            letterSpacing: '2px',
            marginBottom: '6px',
          }}>
            📖 note記事を購入で全機能解放
          </div>
          <div style={{
            fontSize: '28px',
            color: '#0a1f14',
            fontWeight: 900,
            letterSpacing: '-1px',
          }}>
            ¥980
          </div>
          <div style={{
            fontSize: '11px',
            color: '#0a1f14',
            marginTop: '4px',
            opacity: 0.85,
            lineHeight: 1.5,
          }}>
            完全ガイド記事(20,000字)+<br/>
            このアプリの全機能が使える
          </div>
        </div>

        {/* note記事を読むボタン */}
        <a
          href="https://note.com/your_note_url"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block',
            width: '100%',
            padding: '14px',
            background: '#ffd60a',
            border: 'none',
            borderRadius: '14px',
            color: '#0a1f14',
            fontSize: '14px',
            fontWeight: 900,
            cursor: 'pointer',
            fontFamily: 'inherit',
            marginBottom: '14px',
            textAlign: 'center',
            textDecoration: 'none',
            boxShadow: '0 4px 12px rgba(255, 214, 10, 0.4)',
            boxSizing: 'border-box',
          }}
        >
          📖 note記事を読む
        </a>

        {/* 区切り */}
        <div style={{
          textAlign: 'center',
          marginBottom: '14px',
          color: '#6b7c6f',
          fontSize: '11px',
          letterSpacing: '2px',
        }}>
          ─── または ───
        </div>

        {/* アクセスコード入力 */}
        <div style={{
          background: '#143d24',
          borderRadius: '14px',
          padding: '14px',
          marginBottom: '14px',
          border: '1px solid #2d6a4f',
        }}>
          <div style={{
            fontSize: '11px',
            color: '#ffd60a',
            fontWeight: 800,
            letterSpacing: '1px',
            marginBottom: '8px',
          }}>
            🔓 アクセスコード入力
          </div>
          <div style={{
            fontSize: '11px',
            color: '#b7e4c7',
            marginBottom: '10px',
            lineHeight: 1.5,
          }}>
            note記事をご購入の方は、<br/>
            記事内のアクセスコードを入力してください
          </div>
          <input
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setError(false);
            }}
            placeholder="ACCESS CODE"
            style={{
              width: '100%',
              padding: '12px',
              background: '#0a1f14',
              border: error ? '2px solid #ff6b35' : '1px solid #2d6a4f',
              borderRadius: '10px',
              color: '#fff',
              fontSize: '14px',
              fontFamily: "'Courier New', monospace",
              letterSpacing: '2px',
              textAlign: 'center',
              fontWeight: 700,
              boxSizing: 'border-box',
              outline: 'none',
            }}
          />
          {error && (
            <div style={{
              fontSize: '11px',
              color: '#ff6b35',
              marginTop: '6px',
              textAlign: 'center',
            }}>
              ❌ コードが正しくありません
            </div>
          )}
          <button
            onClick={handleSubmit}
            style={{
              width: '100%',
              padding: '12px',
              marginTop: '10px',
              background: '#4caf50',
              border: 'none',
              borderRadius: '10px',
              color: '#fff',
              fontSize: '13px',
              fontWeight: 900,
              cursor: 'pointer',
              fontFamily: 'inherit',
              boxSizing: 'border-box',
            }}
          >
            ✓ コードで解放
          </button>
        </div>

        {/* 閉じるボタン */}
        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: '12px',
            background: 'transparent',
            border: '1px solid #2d6a4f',
            borderRadius: '12px',
            color: '#b7e4c7',
            fontSize: '13px',
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          後で
        </button>
      </div>
    </div>
  );
}

function PaywallFeature({ icon, text, last }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '8px 0',
      borderBottom: last ? 'none' : '1px dashed #2d6a4f',
    }}>
      <span style={{ fontSize: '16px' }}>{icon}</span>
      <span style={{ fontSize: '13px', color: '#e8f5e9', flex: 1 }}>{text}</span>
      <span style={{ color: '#4caf50', fontSize: '14px', fontWeight: 900 }}>✓</span>
    </div>
  );
}

// ==================== 基本ルール ====================
function BasicsTab() {
  const rules = [
    { title: 'サーブ', desc: 'アンダーハンドで打つ。対角線のサービスコートに入れる。ボールは腰より下の位置で打つ。', icon: '🏓' },
    { title: 'ツーバウンドルール', desc: 'サーブ後、レシーブ側もサーブ側も必ず1回ずつワンバウンドさせてから打つ。その後はノーバウンドOK。', icon: '⚡' },
    { title: '得点', desc: 'サーブ側だけが得点できる。レシーブ側がミスしたらサーブ側に1点。', icon: '🎯' },
    { title: 'ゲーム終了', desc: '通常11点先取、2点差以上で勝利。トーナメントでは15点や21点制もある。', icon: '🏆' },
    { title: 'フォルト', desc: 'アウト、ネット、キッチン内でのボレーなどは全てフォルト。サーブ側なら相手へサーブ権移動、レシーブ側なら相手に1点。', icon: '❌' },
  ];

  return (
    <div>
      <SectionTitle>基本ルール5つ</SectionTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {rules.map((rule, i) => (
          <div key={i} style={{
            background: 'linear-gradient(135deg, #1a4d2e 0%, #143d24 100%)',
            borderRadius: '14px',
            padding: '16px',
            borderLeft: '4px solid #ffd60a',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ fontSize: '24px' }}>{rule.icon}</span>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#ffd60a' }}>{rule.title}</h3>
            </div>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.7, color: '#e8f5e9' }}>{rule.desc}</p>
          </div>
        ))}
      </div>

      <SectionTitle style={{ marginTop: '32px' }}>試合の流れ</SectionTitle>
      <div style={{
        background: '#143d24',
        borderRadius: '14px',
        padding: '18px',
        border: '1px solid #2d6a4f',
      }}>
        {[
          'サーブ側がスコアをコールしてサーブ',
          'レシーブ側がワンバウンドしてリターン',
          'サーブ側もワンバウンドさせて返す（ツーバウンドルール）',
          '以降はノーバウンドまたはワンバウンドで自由',
          'ミスした方がフォルト → サーブ側なら得点、レシーブ側ならサーブ権交代',
        ].map((step, i) => (
          <div key={i} style={{ display: 'flex', gap: '12px', padding: '10px 0', borderBottom: i < 4 ? '1px dashed #2d6a4f' : 'none' }}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '50%',
              background: '#ffd60a', color: '#0a1f14',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 900, fontSize: '14px', flexShrink: 0,
            }}>{i + 1}</div>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.6, color: '#e8f5e9' }}>{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==================== 詳細ルール ====================
function DetailTab({ setActiveTab }) {
  const [section, setSection] = useState('serve');

  const sections = [
    { id: 'serve', label: 'サーブ', icon: '🏓', ready: true },
    { id: 'kitchen', label: 'キッチン', icon: '🚫', ready: true },
    { id: 'score', label: 'スコア', icon: '🔢', ready: true },
    { id: 'rally', label: 'ラリー', icon: '💥', ready: true },
  ];

  return (
    <div>
      <SectionTitle>詳細ルール</SectionTitle>
      <p style={{ fontSize: '13px', color: '#b7e4c7', lineHeight: 1.6, marginBottom: '16px' }}>
        各ルールの深掘り解説。「基本ルール」より詳しく、「ルール辞典」より体系的に理解できます。
      </p>

      {/* サブタブ */}
      <div style={{
        display: 'flex',
        gap: '6px',
        overflowX: 'auto',
        marginBottom: '20px',
        paddingBottom: '4px',
      }}>
        {sections.map(s => (
          <button
            key={s.id}
            onClick={() => s.ready && setSection(s.id)}
            disabled={!s.ready}
            style={{
              padding: '10px 14px',
              background: section === s.id ? '#ffd60a' : 'transparent',
              color: section === s.id ? '#0a1f14' : (s.ready ? '#b7e4c7' : '#3d5a4a'),
              border: section === s.id ? 'none' : '1px solid #2d6a4f',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 800,
              cursor: s.ready ? 'pointer' : 'not-allowed',
              fontFamily: 'inherit',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              opacity: s.ready ? 1 : 0.5,
            }}
          >
            <span>{s.icon}</span>
            {s.label}
            {!s.ready && <span style={{ fontSize: '9px' }}>準備中</span>}
          </button>
        ))}
      </div>

      {section === 'serve' && <ServeDetail />}
      {section === 'kitchen' && <KitchenDetail />}
      {section === 'score' && <ScoreDetail setActiveTab={setActiveTab} />}
      {section === 'rally' && <RallyDetail />}
      {!['serve', 'kitchen', 'score', 'rally'].includes(section) && (
        <div style={{
          background: '#143d24',
          borderRadius: '14px',
          padding: '40px 20px',
          border: '1px dashed #2d6a4f',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🚧</div>
          <h3 style={{ margin: '0 0 8px', color: '#ffd60a', fontSize: '16px', fontWeight: 800 }}>
            準備中
          </h3>
          <p style={{ margin: 0, fontSize: '13px', color: '#b7e4c7', lineHeight: 1.6 }}>
            このセクションは準備中です。<br/>
            まずは「サーブ」の詳細ルールをご覧ください。
          </p>
        </div>
      )}
    </div>
  );
}

// ---------- サーブ詳細 ----------
function ServeDetail() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* イントロ */}
      <DetailCard color="#ffd60a">
        <div style={{ fontSize: '10px', letterSpacing: '2px', color: '#ffd60a', fontWeight: 800, marginBottom: '6px' }}>
          📌 大前提
        </div>
        <h3 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: 900, color: '#fff' }}>
          サーブは2種類ある
        </h3>
        <p style={{ margin: 0, fontSize: '13px', color: '#e8f5e9', lineHeight: 1.7 }}>
          <strong style={{ color: '#ffd60a' }}>① バレーサーブ</strong>：空中でボールを打つ（厳しい制約あり）<br/>
          <strong style={{ color: '#ffd60a' }}>② ドロップサーブ</strong>：落としてバウンド後に打つ（制約が緩い）
        </p>
      </DetailCard>

      {/* 共通ルール */}
      <div>
        <SubSectionTitle>🌐 両方に共通するルール</SubSectionTitle>
        <DetailList items={[
          { title: '足の位置', desc: 'ボールを打つ瞬間、最低1本の足がベースライン後方の地面に接地。両足が空中ならフォルト。センター・サイドライン延長線の内側に両足とも収まること。' },
          { title: '対角線のサービスコート', desc: '相手コートの対角サービスエリアに着地させる。同じ側のコートに入れたらフォルト。' },
          { title: 'サーブのキッチンはアウト', desc: 'サーブがキッチン内・キッチンラインに落ちたらフォルト（ショート）。ラリー中のルールと違うので注意！' },
          { title: 'サーブは1回のみ', desc: 'テニスと違ってセカンドサーブなし。1回のフォルトで即ラリー終了（サーブ権移動 or 相手の得点）。' },
          { title: '手でのスピン禁止', desc: 'ボールを手で回してからサーブはフォルト。ただしパドル接触時のスピンはOK。' },
          { title: '10秒ルール', desc: 'スコアコール後、10秒以内にサーブ。遅延したらフォルト。' },
        ]} />
      </div>

      {/* バレーサーブ */}
      <div>
        <SubSectionTitle>🎾 バレーサーブの3大条件</SubSectionTitle>
        <div style={{
          background: 'linear-gradient(135deg, #ff6b35 0%, #d84315 100%)',
          borderRadius: '12px',
          padding: '12px',
          marginBottom: '12px',
        }}>
          <p style={{ margin: 0, fontSize: '12px', color: '#fff', fontWeight: 700, lineHeight: 1.5 }}>
            ⚠️ 2026年改定：3条件すべてに「<strong>明確に（clearly）</strong>」が追加。ボーダーラインは即フォルト扱いに。
          </p>
        </div>
        <DetailList items={[
          { title: '① 下から上への「弧」を描く', desc: 'パドルが接触する瞬間、下から上に向かって動いている必要あり。横振り（サイドアーム）や上から下（トップスピン）はフォルト。' },
          { title: '② ボール接触は「腰」より下', desc: '目安はおへその高さ。それより上で打ったらフォルト。' },
          { title: '③ パドルヘッドは「手首」より下', desc: 'ボールに触れる瞬間、パドルの先端が手首より高い位置にあってはダメ。パドルが斜め下向きの状態で打つイメージ。' },
        ]} numbered />
      </div>

      {/* ドロップサーブ */}
      <div>
        <SubSectionTitle>🏓 ドロップサーブ（制約が緩い！）</SubSectionTitle>
        <DetailCard color="#4caf50">
          <div style={{ fontSize: '13px', color: '#e8f5e9', lineHeight: 1.7 }}>
            <strong style={{ color: '#4caf50' }}>バレーサーブの3条件（弧・腰・手首）がすべて適用されない！</strong><br/>
            サイドアーム、上から下への振り、スライス、ドライブ、すべて合法。初心者や高齢者に推奨。
          </div>
        </DetailCard>

        <div style={{ marginTop: '12px' }}>
          <div style={{ fontSize: '13px', color: '#ffd60a', fontWeight: 800, marginBottom: '8px' }}>
            ドロップサーブの必須条件
          </div>
          <DetailList items={[
            { title: '自然な高さから手放す', desc: '腕を上げるのはOK（高いほど有利）。ただし下向きに投げ下ろすのはNG。肩より上から落とすのは合法。' },
            { title: '推進力を与えない', desc: '投げ下ろし・押し下げ・放り投げはすべてNG。ただ手を開いて重力で落とすのみOK。' },
            { title: 'バウンド回数は自由', desc: '1回でも2回でも何回でもバウンドしてから打てる。低くなるまで待つ戦術もアリ。' },
            { title: 'バウンド場所も自由', desc: 'コート上のどこでバウンドしてもOK。ベースライン後方でも、サービスエリア内でもOK。' },
            { title: 'フォア/バックどちらでもOK', desc: '利き手・逆手、グリップも自由。' },
          ]} />
        </div>
      </div>

      {/* 比較表 */}
      <div>
        <SubSectionTitle>📊 バレーサーブ vs ドロップサーブ</SubSectionTitle>
        <CompareTable />
      </div>

      {/* なぜドロップサーブは緩いのか */}
      <DetailCard color="#b7e4c7" bg="#143d24">
        <div style={{ fontSize: '10px', letterSpacing: '2px', color: '#b7e4c7', fontWeight: 800, marginBottom: '6px' }}>
          💡 背景
        </div>
        <h3 style={{ margin: '0 0 8px', fontSize: '14px', fontWeight: 900, color: '#fff' }}>
          なぜドロップサーブは規制が緩い？
        </h3>
        <p style={{ margin: 0, fontSize: '13px', color: '#e8f5e9', lineHeight: 1.7 }}>
          2021年に導入、2024年に恒久化された新しい選択肢。目的は<strong style={{ color: '#ffd60a' }}>「初心者・高齢者・障害のあるプレイヤーが参加しやすくするため」</strong>。バウンドさせる分だけ時間的余裕ができて打ちやすい。代わりにパワーが出にくいので公平性が保たれる仕組み。
        </p>
      </DetailCard>

      {/* フォルト早見表 */}
      <div>
        <SubSectionTitle>❌ サーブのフォルト早見表</SubSectionTitle>
        <FaultTable />
      </div>

      {/* 戦略ポイント */}
      <div>
        <SubSectionTitle>🎯 どちらを選ぶべき？</SubSectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
          <StrategyCard
            title="バレーサーブを使うべき人"
            color="#ff6b35"
            items={[
              'パワーと攻撃性を重視',
              '上半身のコントロールに自信あり',
              '競技志向で戦術の幅を広げたい',
            ]}
          />
          <StrategyCard
            title="ドロップサーブを使うべき人"
            color="#4caf50"
            items={[
              '初心者：まず安定して入れたい',
              '高齢者・障害のある方：体に負担が少ない',
              'スピンサーブを極めたい（規制なし）',
              'バリエーションで相手を幻惑したい',
            ]}
          />
        </div>
      </div>
    </div>
  );
}

// ---------- キッチン詳細 ----------
function KitchenDetail() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* イントロ */}
      <DetailCard color="#ff6b35">
        <div style={{ fontSize: '10px', letterSpacing: '2px', color: '#ff6b35', fontWeight: 800, marginBottom: '6px' }}>
          📌 大前提
        </div>
        <h3 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: 900, color: '#fff' }}>
          キッチン（ノンボレーゾーン）とは？
        </h3>
        <p style={{ margin: 0, fontSize: '13px', color: '#e8f5e9', lineHeight: 1.7 }}>
          ネットから<strong style={{ color: '#ffd60a' }}>左右2.13m（7フィート）</strong>のエリア。正式名は「ノンボレーゾーン（NVZ）」。この場所で<strong style={{ color: '#ffd60a' }}>ボレー（ノーバウンドで打つこと）のみ禁止</strong>。それ以外は自由に入れる。
        </p>
      </DetailCard>

      {/* 3つのルール */}
      <div>
        <SubSectionTitle>🚫 キッチンの3大ルール</SubSectionTitle>
        <DetailList items={[
          { title: 'ボレー中にキッチン接触 = フォルト', desc: 'ボレーする瞬間、足・パドル・服・靴ひもなど体の一部がキッチン（ラインを含む）に触れていたらフォルト。' },
          { title: 'ボレー後の勢い（モメンタム）でもフォルト', desc: '打つ瞬間は外でも、勢いで前に進んでキッチンに入ったらフォルト。ボールがもうデッドでもフォルトは取られる。' },
          { title: 'ラインも完全にキッチン扱い', desc: 'ラインに少しでも触れたらキッチン内と同じ。「踏んでないつもり」は通用しない。' },
        ]} numbered />
      </div>

      {/* ✅ OKパターン */}
      <div>
        <SubSectionTitle>✅ OKなパターン（意外と知らない）</SubSectionTitle>
        <DetailList items={[
          { title: 'キッチン内に立つだけ', desc: 'ボレーしなければ、何秒立っていてもOK。散歩してもOK（戦術的にはナンセンスだけど）。' },
          { title: 'キッチン内でバウンド後のボールを打つ', desc: 'ワンバウンドしたボールなら、キッチン内のどこに立っていても打てる。これはボレーではないのでセーフ。' },
          { title: 'ジャンプしてキッチン上空を通過', desc: 'キッチン外で離陸 → 空中でキッチン上を通る → キッチン外に着地。これは合法（エルネショット）。' },
          { title: 'パドルだけがキッチン上空を横切る', desc: '足がキッチン外なら、パドルが空中でキッチンの上を通ってもOK。' },
          { title: 'パートナーがキッチン内にいる時、自分は外でボレー', desc: '相手に触れなければOK。パートナーの位置は自分の判定に影響しない。' },
        ]} />
      </div>

      {/* モメンタムルール徹底解説 */}
      <div>
        <SubSectionTitle>🌀 モメンタムルール完全解説</SubSectionTitle>
        <DetailCard color="#ffd60a">
          <div style={{ fontSize: '10px', letterSpacing: '2px', color: '#ffd60a', fontWeight: 800, marginBottom: '6px' }}>
            📖 モメンタムとは？
          </div>
          <p style={{ margin: 0, fontSize: '13px', color: '#e8f5e9', lineHeight: 1.7 }}>
            <strong style={{ color: '#ffd60a' }}>「ボレーした後も体が前に進み続ける慣性の力」</strong>のこと。物理の運動エネルギー。<br/>
            ボールを打ったその瞬間はキッチン外でも、振り抜きの勢いで体が前のめりになってキッチンに入ってしまう現象がモメンタム違反です。
          </p>
        </DetailCard>

        <DetailCard color="#ff6b35" bg="#143d24">
          <p style={{ margin: '8px 0 0 0', fontSize: '13px', color: '#e8f5e9', lineHeight: 1.7 }}>
            公式ルールでは「ボレー動作はボールを打った瞬間に終わるのではなく、<strong style={{ color: '#ffd60a' }}>振り抜きとそれに伴う体の動きが完全に止まるまで続く</strong>」と定義されています。
          </p>
        </DetailCard>

        <div style={{ marginTop: '12px' }}>
          <DetailList items={[
            { title: '時間制限はない', desc: '「何秒以内ならセーフ」というルールは存在しない。「バランスと制御を取り戻すまで」モメンタムが続く。' },
            { title: '完全に止まるまで続く', desc: 'ボレー後、体が前進している間はずっとモメンタム中。ふらついて後から入ってもフォルト。' },
            { title: '相手の返球後でもダメ', desc: '相手がもう打ち返した後でも、最初のボレーの勢いで入ったらフォルト。' },
            { title: 'バランス取り戻しがリセット条件', desc: '足が安定して、前進動作が完全に止まったら、モメンタムは終了。そこからキッチンに入るのはOK。' },
          ]} />
        </div>

        <div style={{
          marginTop: '12px',
          background: 'linear-gradient(135deg, #ff6b35 0%, #d84315 100%)',
          borderRadius: '12px',
          padding: '14px',
        }}>
          <div style={{ fontSize: '12px', color: '#fff', fontWeight: 800, marginBottom: '6px' }}>
            ⚠️ 安全警告
          </div>
          <p style={{ margin: 0, fontSize: '12px', color: '#fff', lineHeight: 1.6 }}>
            モメンタムで前のめりになって転倒するのがピックルボールの転倒事故第1位。特に55歳以上で多い。届かないボールは無理せずバウンドさせる判断も大切です。
          </p>
        </div>
      </div>

      {/* 2-Becomes-1ルール */}
      <div>
        <SubSectionTitle>👥 「2-Becomes-1」ルール（ダブルス特有）</SubSectionTitle>
        <DetailCard color="#ffd60a" bg="linear-gradient(135deg, #1a4d2e 0%, #143d24 100%)">
          <div style={{ fontSize: '10px', letterSpacing: '2px', color: '#ffd60a', fontWeight: 800, marginBottom: '6px' }}>
            📖 読み方・意味
          </div>
          <p style={{ margin: '0 0 10px', fontSize: '13px', color: '#e8f5e9', lineHeight: 1.7 }}>
            <strong style={{ color: '#ffd60a' }}>「ツー・ビカムズ・ワン」</strong>＝「2人が1人になる」という意味。<br/>
            ダブルスで2人のプレイヤーが接触すると、ルール上は1人として扱われる、という概念です。
          </p>
          <p style={{ margin: '0 0 10px', fontSize: '13px', color: '#e8f5e9', lineHeight: 1.7 }}>
            パートナーがキッチン内に立っている時、自分がボレーして<strong style={{ color: '#ff6b35' }}>パートナーに接触したら自分もキッチン扱い</strong>。=フォルト。
          </p>
          <p style={{ margin: 0, fontSize: '12px', color: '#b7e4c7', lineHeight: 1.6 }}>
            理由：パートナーを「台」にしてキッチン内で実質ボレーする裏技を防ぐため。2人は1人として扱われる。
          </p>
        </DetailCard>
      </div>

      {/* 再エントリールール */}
      <div>
        <SubSectionTitle>🔄 キッチンから出た後、またボレーするには？</SubSectionTitle>
        <DetailCard color="#ff6b35" bg="#143d24">
          <p style={{ margin: 0, fontSize: '13px', color: '#e8f5e9', lineHeight: 1.7 }}>
            <strong style={{ color: '#ffd60a' }}>シーン：</strong>キッチン内でバウンドしたボールを打った後、ボレー態勢に戻りたい時。<br/>
            キッチンから出た後、もう一度ボレーするには「足を完全にキッチン外の地面に戻す」必要があります。
          </p>
        </DetailCard>

        <div style={{ marginTop: '12px' }}>
          <DetailList items={[
            { title: '両足とも地面に着地が必須', desc: 'キッチン外の地面に両足ともしっかり着地してから、初めてボレー可能。これを「再確立（re-establish）」と呼ぶ。' },
            { title: 'ジャンプして空中で打つのはダメ', desc: 'キッチン内から飛び上がって、空中でキッチン外に体があってもボレー不可。必ず地面に「両足で立つ」ことが必要。' },
            { title: '片足だけ外はNG', desc: '片足はキッチン内、片足はキッチン外、という状態ではまだボレー不可。両足とも明確にキッチン外に出ている必要あり。' },
          ]} />
        </div>
      </div>

      {/* フォルト早見表 */}
      <div>
        <SubSectionTitle>❌ キッチン関連のフォルト早見表</SubSectionTitle>
        <KitchenFaultTable />
      </div>

      {/* 特殊ショット */}
      <div>
        <SubSectionTitle>🎾 キッチン関連の特殊ショット</SubSectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <SpecialShotCard
            name="エルネ（Erne）"
            legal={true}
            desc="キッチン外のサイドラインあたりから、ジャンプしてネット際でボレー。キッチン外離陸→キッチン外着地ならOK。空中でキッチン上空を通過するだけ。"
          />
          <SpecialShotCard
            name="ATP（Around The Post）"
            legal={true}
            desc="ネットポストの外側を回り込んで相手コートに入れるショット。ネットより低い位置でもOK。ただしネット下やポストとネットの隙間を通すのは常にフォルト。キッチンルールも通常通り適用。"
          />
          <SpecialShotCard
            name="キッチン内ドロップ（ディンク）"
            legal={true}
            desc="ボールがバウンド後なら、キッチン内に立って打つのは合法。ソフトタッチで相手コートのキッチンに落とす戦術。"
          />
        </div>
      </div>

      {/* よくある誤解 */}
      <div>
        <SubSectionTitle>🤔 よくある誤解</SubSectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <MythCard
            myth="「キッチンに入ったら即フォルト」"
            truth="ボレーしなければOK。ただ立っているだけなら問題なし。"
          />
          <MythCard
            myth="「ボレー後、すぐ出ればセーフ」"
            truth="ダメ。モメンタムで入った時点でフォルト確定。いつ出るかは関係ない。"
          />
          <MythCard
            myth="「ラインを少し踏んだだけならOK」"
            truth="ダメ。ラインもキッチンの一部。わずかな接触でもフォルト。"
          />
          <MythCard
            myth="「ジャンプしてキッチン外に着地すれば何でもOK」"
            truth="条件付き。離陸も着地もキッチン外ならOK（エルネ）。ただし離陸がキッチン内ならNG。"
          />
        </div>
      </div>

      {/* 背景説明 */}
      <DetailCard color="#b7e4c7" bg="#143d24">
        <div style={{ fontSize: '10px', letterSpacing: '2px', color: '#b7e4c7', fontWeight: 800, marginBottom: '6px' }}>
          💡 背景
        </div>
        <h3 style={{ margin: '0 0 8px', fontSize: '14px', fontWeight: 900, color: '#fff' }}>
          なぜキッチンが存在する？
        </h3>
        <p style={{ margin: 0, fontSize: '13px', color: '#e8f5e9', lineHeight: 1.7 }}>
          身長や体力で勝る選手がネット際で連続スマッシュする「ネットクラッシング」戦術を防ぐため。これにより<strong style={{ color: '#ffd60a' }}>ディンク（ソフトショット）</strong>が生まれ、戦略性と技巧が重要なスポーツになった。キッチンこそが<strong style={{ color: '#ffd60a' }}>パワー勝負ではなく頭脳戦</strong>にしている最重要ルール。
        </p>
      </DetailCard>
    </div>
  );
}

function KitchenFaultTable() {
  const faults = [
    { name: 'ボレー中の接触', desc: 'ボレー瞬間、足・パドル・服がキッチン/ラインに触れた' },
    { name: 'モメンタム違反', desc: 'ボレー後、勢いでキッチンに入った' },
    { name: '2-Becomes-1違反', desc: 'ボレー中にキッチン内のパートナーに接触' },
    { name: '持ち物落下', desc: 'ボレー中に帽子・サングラスがキッチンに落ちた' },
    { name: 'ライン接触', desc: 'ボレー中にキッチンラインを少しでも踏んだ' },
    { name: '再エントリー不足', desc: 'キッチン内から出た直後、両足接地前にボレー' },
    { name: 'ジャンプ失敗', desc: 'キッチン内から離陸してボレー、どこに着地でもNG' },
  ];

  return (
    <div style={{
      background: '#143d24',
      borderRadius: '12px',
      border: '1px solid #2d6a4f',
      overflow: 'hidden',
    }}>
      {faults.map((f, i) => (
        <div key={i} style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.5fr',
          padding: '10px',
          borderBottom: i < faults.length - 1 ? '1px solid #2d6a4f' : 'none',
          fontSize: '12px',
          gap: '10px',
        }}>
          <div style={{
            color: '#ff6b35',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <span>❌</span>
            <span>{f.name}</span>
          </div>
          <div style={{ color: '#b7e4c7', lineHeight: 1.5 }}>{f.desc}</div>
        </div>
      ))}
    </div>
  );
}

function SpecialShotCard({ name, legal, desc }) {
  return (
    <div style={{
      background: '#143d24',
      borderRadius: '12px',
      padding: '12px',
      borderLeft: `4px solid ${legal ? '#4caf50' : '#ff6b35'}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
        <div style={{
          background: legal ? '#4caf50' : '#ff6b35',
          color: '#fff',
          borderRadius: '4px',
          padding: '2px 6px',
          fontSize: '10px',
          fontWeight: 900,
        }}>
          {legal ? '✅ 合法' : '❌ フォルト'}
        </div>
        <div style={{ fontSize: '14px', color: '#fff', fontWeight: 800 }}>
          {name}
        </div>
      </div>
      <p style={{ margin: 0, fontSize: '12px', color: '#b7e4c7', lineHeight: 1.6 }}>
        {desc}
      </p>
    </div>
  );
}

function MythCard({ myth, truth }) {
  return (
    <div style={{
      background: '#143d24',
      borderRadius: '10px',
      padding: '12px',
      border: '1px solid #2d6a4f',
    }}>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
        <span style={{ color: '#ff6b35', fontWeight: 900 }}>❌</span>
        <span style={{ fontSize: '13px', color: '#ff6b35', fontWeight: 700, lineHeight: 1.4 }}>
          {myth}
        </span>
      </div>
      <div style={{ display: 'flex', gap: '8px', paddingLeft: '2px' }}>
        <span style={{ color: '#4caf50', fontWeight: 900 }}>✅</span>
        <span style={{ fontSize: '12px', color: '#e8f5e9', lineHeight: 1.6 }}>
          {truth}
        </span>
      </div>
    </div>
  );
}

// ---------- スコア詳細 ----------
function ScoreDetail({ setActiveTab }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* イントロ */}
      <DetailCard color="#ffd60a">
        <div style={{ fontSize: '10px', letterSpacing: '2px', color: '#ffd60a', fontWeight: 800, marginBottom: '6px' }}>
          📌 大前提
        </div>
        <h3 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: 900, color: '#fff' }}>
          ピックルボールのスコアは「3つの数字」
        </h3>
        <p style={{ margin: 0, fontSize: '13px', color: '#e8f5e9', lineHeight: 1.7 }}>
          ダブルスでは毎サーブ前に<strong style={{ color: '#ffd60a' }}>「自分の点数-相手の点数-サーバー番号」</strong>を声に出してコール。例: <strong style={{ color: '#ffd60a' }}>「5 - 3 - 2」</strong>
        </p>
      </DetailCard>

      {/* 3つの数字の意味 */}
      <div>
        <SubSectionTitle>🔢 3つの数字の意味</SubSectionTitle>
        <ThreeNumberVisual />
      </div>

      {/* サーバー番号 */}
      <div>
        <SubSectionTitle>🎯 サーバー番号（1 or 2）とは？</SubSectionTitle>
        <DetailCard color="#ffd60a" bg="#143d24">
          <p style={{ margin: 0, fontSize: '13px', color: '#e8f5e9', lineHeight: 1.7 }}>
            ダブルスでは、1チームにつき<strong style={{ color: '#ffd60a' }}>2人とも順番にサーブ権</strong>がある。それを区別するのが「サーバー番号」。
          </p>
        </DetailCard>

        <div style={{ marginTop: '12px' }}>
          <DetailList items={[
            { title: 'サーバー1 = 最初にサーブする人', desc: 'サーブ権を得てから最初にサーブする人。フォルトしたらパートナーに交代(=サーバー2になる)。' },
            { title: 'サーバー2 = 次にサーブするパートナー', desc: 'サーバー1がフォルトしたあと、サーブ権を引き継ぐ人。サーバー2もフォルトすると、サーブ権が相手チームに移る(サイドアウト)。' },
          ]} numbered />
        </div>

        {/* 練習誘導ボタン */}
        <button
          onClick={() => setActiveTab && setActiveTab('simulator')}
          style={{
            width: '100%',
            marginTop: '14px',
            padding: '16px',
            background: 'linear-gradient(135deg, #ffd60a 0%, #f9a825 100%)',
            border: 'none',
            borderRadius: '14px',
            cursor: 'pointer',
            fontFamily: 'inherit',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 4px 12px rgba(255, 214, 10, 0.3)',
          }}
        >
          <div style={{
            width: '44px', height: '44px', borderRadius: '50%',
            background: '#0a1f14', color: '#ffd60a',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '22px', flexShrink: 0,
          }}>
            🎯
          </div>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div style={{ fontSize: '10px', color: '#0a1f14', fontWeight: 700, letterSpacing: '1px', marginBottom: '2px' }}>
              HANDS-ON PRACTICE
            </div>
            <div style={{ fontSize: '14px', color: '#0a1f14', fontWeight: 900, lineHeight: 1.3 }}>
              コール練習で実際にやってみる
            </div>
            <div style={{ fontSize: '11px', color: '#0a1f14', opacity: 0.8, marginTop: '2px' }}>
              得点/フォルトをタップして、次のコールを体で覚えよう
            </div>
          </div>
          <div style={{
            fontSize: '22px',
            color: '#0a1f14',
            fontWeight: 900,
            flexShrink: 0,
          }}>
            →
          </div>
        </button>
      </div>

      {/* ゲーム開始時の例外ルール */}
      <div>
        <SubSectionTitle>⚡ ゲーム開始時の「0-0-2」ルール</SubSectionTitle>
        <DetailCard color="#ff6b35">
          <div style={{ fontSize: '10px', letterSpacing: '2px', color: '#ff6b35', fontWeight: 800, marginBottom: '6px' }}>
            ⚠️ 初心者が最も混乱するポイント
          </div>
          <p style={{ margin: 0, fontSize: '13px', color: '#e8f5e9', lineHeight: 1.7 }}>
            ゲーム開始の最初のサーブは<strong style={{ color: '#ffd60a' }}>必ず「0-0-2」からスタート</strong>。つまり最初のサーバーはいきなり「サーバー2扱い」。
          </p>
        </DetailCard>

        <DetailCard color="#b7e4c7" bg="#143d24">
          <div style={{ fontSize: '12px', color: '#ffd60a', fontWeight: 800, marginBottom: '6px' }}>
            💡 なぜこのルールがある？
          </div>
          <p style={{ margin: 0, fontSize: '12px', color: '#b7e4c7', lineHeight: 1.6 }}>
            先攻チームが有利になりすぎないため。もし最初から「サーバー1」だと、先攻チームだけ2人とも確実にサーブできてしまう。「サーバー2」扱いにすることで、先攻チームはフォルトしたらすぐサーブ権を相手に渡す必要がある。公平性を保つための仕組み。
          </p>
        </DetailCard>
      </div>

      {/* 偶数=右/奇数=左 */}
      <div>
        <SubSectionTitle>📐 サーブの位置ルール（偶数=右/奇数=左）</SubSectionTitle>
        <DetailCard color="#ffd60a">
          <p style={{ margin: 0, fontSize: '13px', color: '#e8f5e9', lineHeight: 1.7 }}>
            自分の点数が<strong style={{ color: '#ffd60a' }}>偶数なら右側</strong>、<strong style={{ color: '#ffd60a' }}>奇数なら左側</strong>からサーブ。これはシングルスもダブルスも同じ。
          </p>
        </DetailCard>

        <div style={{ marginTop: '12px' }}>
          <ScorePositionTable />
        </div>

        <DetailCard color="#b7e4c7" bg="#143d24">
          <div style={{ fontSize: '12px', color: '#ffd60a', fontWeight: 800, marginBottom: '6px' }}>
            💡 覚え方のコツ
          </div>
          <p style={{ margin: 0, fontSize: '12px', color: '#b7e4c7', lineHeight: 1.7 }}>
            得点するたびパートナーと位置を入れ替えるので、偶数=右/奇数=左は自動的にそうなる。<strong style={{ color: '#ffd60a' }}>「自分のスコアが偶数なら、最初のサーバーが右側にいる」</strong>が確認方法。位置がズレていたら誰かが間違ってる。
          </p>
        </DetailCard>

        {/* 位置移動の図解 */}
        <div style={{ marginTop: '16px' }}>
          <div style={{
            fontSize: '14px',
            color: '#ffd60a',
            fontWeight: 800,
            marginBottom: '10px',
          }}>
            🎯 得点・フォルト時の位置変化
          </div>
          <PositionChangeDiagram />
        </div>
      </div>

      {/* シングルス vs ダブルス */}
      <div>
        <SubSectionTitle>👥 シングルス vs ダブルスの違い</SubSectionTitle>
        <ScoreCompareTable />
      </div>

      {/* 試合終了条件 */}
      <div>
        <SubSectionTitle>🏆 ゲーム終了条件</SubSectionTitle>
        <DetailList items={[
          { title: '通常11点先取、2点差以上で勝利', desc: '11-10の場合は続行、12-10で勝利。2点差が必須。' },
          { title: 'トーナメントでは15点・21点制もある', desc: '15点制なら14点、21点制なら20点が終盤の目安。いずれも2点差ルール適用。' },
          { title: 'コートチェンジは6点目', desc: '11点ゲームなら片方が6点到達時、15点なら8点、21点なら11点で交代。' },
        ]} />
      </div>

      {/* スコアコール訂正ルール */}
      <div>
        <SubSectionTitle>✏️ スコアを間違えてコールしたら？</SubSectionTitle>
        <DetailCard color="#ff6b35">
          <p style={{ margin: 0, fontSize: '13px', color: '#e8f5e9', lineHeight: 1.7 }}>
            タイミングによって扱いが<strong style={{ color: '#ffd60a' }}>大きく違う</strong>ので注意。
          </p>
        </DetailCard>

        <div style={{ marginTop: '12px' }}>
          <DetailList items={[
            { title: 'リターン前なら誰でも停止OK', desc: '誤コールに気付いた時点で、サーブ側・レシーブ側どちらも停止を要求できる。正しかったらリプレイ。' },
            { title: 'リターン後は停止NG', desc: 'ラリーが始まった後に停止するとフォルト扱い。ラリーを最後まで続けてから、次のサーブ前にスコアを訂正する。' },
            { title: '誤って止めた側がフォルト', desc: '間違った指摘で止めてしまった場合、止めた側のフォルト。リターン後の停止は「スコアが正しい場合でもフォルト」。' },
          ]} />
        </div>
      </div>

      {/* ラリースコアリング */}
      <div>
        <SubSectionTitle>⚡ ラリースコアリング（新方式）</SubSectionTitle>
        <DetailCard color="#ffd60a" bg="#143d24">
          <p style={{ margin: 0, fontSize: '13px', color: '#e8f5e9', lineHeight: 1.7 }}>
            プロリーグ（MLP）や一部トーナメントで採用される<strong style={{ color: '#ffd60a' }}>新しいスコアリング方式</strong>。レクリエーションではまだ珍しいが、今後普及する可能性大。
          </p>
        </DetailCard>

        <div style={{ marginTop: '12px' }}>
          <RallyScoringTable />
        </div>

        <div style={{ marginTop: '12px' }}>
          <DetailList items={[
            { title: 'どちらのチームも得点できる', desc: 'ラリーに勝った方が得点。サーブ側/レシーブ側の区別なし。バレーボールと同じ方式。' },
            { title: '数字は2つだけ', desc: 'サーバー番号のコール不要。「10-8」のように2つの数字だけ。' },
            { title: 'サーバーは1人のみ', desc: 'チーム内でサーバー交代なし。サイドアウトしたら相手に即サーブ権。' },
            { title: 'ゲームは15点または21点', desc: '得点ペースが速いため、通常より長めに設定される。2点差ルールは同じ。' },
          ]} />
        </div>
      </div>

      {/* 背景 */}
      <DetailCard color="#b7e4c7" bg="#143d24">
        <div style={{ fontSize: '10px', letterSpacing: '2px', color: '#b7e4c7', fontWeight: 800, marginBottom: '6px' }}>
          💡 背景
        </div>
        <h3 style={{ margin: '0 0 8px', fontSize: '14px', fontWeight: 900, color: '#fff' }}>
          なぜサーブ側だけ得点できる？
        </h3>
        <p style={{ margin: 0, fontSize: '13px', color: '#e8f5e9', lineHeight: 1.7 }}>
          伝統的に「サーブ権を持つ側が有利」という古いスポーツのルールを継承。ラリーが長引くことでディンクなどの<strong style={{ color: '#ffd60a' }}>繊細な技術が問われる</strong>構造になる。逆にラリースコアリングは、プロ試合の時間管理とTV映え優先で近年導入された新方式。
        </p>
      </DetailCard>
    </div>
  );
}

function ThreeNumberVisual() {
  return (
    <div>
      <div style={{
        background: 'linear-gradient(135deg, #ffd60a 0%, #f9a825 100%)',
        borderRadius: '14px',
        padding: '20px',
        textAlign: 'center',
        marginBottom: '12px',
      }}>
        <div style={{ fontSize: '36px', fontWeight: 900, color: '#0a1f14', letterSpacing: '4px', marginBottom: '8px' }}>
          5 - 3 - 2
        </div>
        <div style={{ fontSize: '11px', color: '#0a1f14', fontWeight: 700 }}>
          サーブ前に必ず声に出す
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <NumberExplainCard
          num="5"
          role="自分（サーブ側）の点数"
          color="#4caf50"
        />
        <NumberExplainCard
          num="3"
          role="相手（レシーブ側）の点数"
          color="#ff6b35"
        />
        <NumberExplainCard
          num="2"
          role="サーバー番号（1 or 2）"
          color="#ffd60a"
        />
      </div>

      <DetailCard color="#b7e4c7" bg="#143d24">
        <div style={{ marginTop: '0' }}>
          <div style={{ fontSize: '12px', color: '#ffd60a', fontWeight: 800, marginBottom: '6px' }}>
            💡 覚え方
          </div>
          <p style={{ margin: 0, fontSize: '13px', color: '#e8f5e9', lineHeight: 1.7 }}>
            「<strong style={{ color: '#ffd60a' }}>じ・あ・さ</strong>」のリズムで覚える。<br/>
            <strong style={{ color: '#4caf50' }}>じ</strong>ぶん → <strong style={{ color: '#ff6b35' }}>あ</strong>いて → <strong style={{ color: '#ffd60a' }}>さ</strong>ーバー番号
          </p>
        </div>
      </DetailCard>
    </div>
  );
}

function NumberExplainCard({ num, role, color }) {
  return (
    <div style={{
      background: '#143d24',
      borderRadius: '10px',
      padding: '12px',
      borderLeft: `4px solid ${color}`,
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
    }}>
      <div style={{
        width: '44px', height: '44px', borderRadius: '50%',
        background: color, color: '#0a1f14',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 900, fontSize: '20px', flexShrink: 0,
      }}>
        {num}
      </div>
      <div style={{ flex: 1, fontSize: '13px', color: '#e8f5e9', fontWeight: 700 }}>
        {role}
      </div>
    </div>
  );
}

function PositionChangeDiagram() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* 得点ケース */}
      <div style={{
        background: '#143d24',
        borderRadius: '14px',
        padding: '14px',
        border: '2px solid #4caf50',
      }}>
        <div style={{
          background: '#4caf50',
          color: '#0a1f14',
          borderRadius: '8px',
          padding: '6px 10px',
          fontSize: '12px',
          fontWeight: 900,
          marginBottom: '12px',
          display: 'inline-block',
        }}>
          ✅ 得点したとき → 左右スイッチ
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          gap: '8px',
          alignItems: 'center',
        }}>
          {/* Before */}
          <CourtDiagramMini
            label="BEFORE"
            score="自分 0点"
            myLeft="🏓自分"
            myRight="👤パー"
            oppLeft="敵1"
            oppRight="敵2"
          />

          <div style={{
            fontSize: '22px',
            color: '#4caf50',
            fontWeight: 900,
            textAlign: 'center',
          }}>
            →
          </div>

          {/* After */}
          <CourtDiagramMini
            label="AFTER"
            score="自分 1点"
            myLeft="👤パー"
            myRight="🏓自分"
            oppLeft="敵1"
            oppRight="敵2"
            arrow={{ from: 'myLeft', to: 'myRight', color: '#4caf50' }}
          />
        </div>

        <div style={{
          marginTop: '12px',
          fontSize: '11px',
          color: '#b7e4c7',
          lineHeight: 1.6,
          background: '#0a1f14',
          padding: '10px',
          borderRadius: '8px',
        }}>
          <strong style={{ color: '#4caf50' }}>1点追加、同じサーバーが続投</strong>。👤自分と👤パートナーが左右入れ替わり、反対側からサーブ。偶数→奇数で位置が逆になる。相手チームは動かない。
        </div>
      </div>

      {/* フォルトケース①：サーバー1のフォルト */}
      <div style={{
        background: '#143d24',
        borderRadius: '14px',
        padding: '14px',
        border: '2px solid #2196f3',
      }}>
        <div style={{
          background: '#2196f3',
          color: '#fff',
          borderRadius: '8px',
          padding: '6px 10px',
          fontSize: '12px',
          fontWeight: 900,
          marginBottom: '12px',
          display: 'inline-block',
        }}>
          🔵 サーバー1のフォルト → チーム内で交代
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          gap: '8px',
          alignItems: 'center',
        }}>
          {/* Before */}
          <CourtDiagramMini
            label="BEFORE"
            score="サーバー1"
            myLeft="🏓自分"
            myRight="👤パー"
            oppLeft="敵2"
            oppRight="敵1"
          />

          <div style={{
            fontSize: '22px',
            color: '#2196f3',
            fontWeight: 900,
            textAlign: 'center',
          }}>
            →
          </div>

          {/* After */}
          <CourtDiagramMini
            label="AFTER"
            score="サーバー2"
            myLeft="👤自分"
            myRight="🏓パー"
            oppLeft="敵2"
            oppRight="敵1"
            arrow={{ from: 'myLeft', to: 'myRight', color: '#2196f3' }}
          />
        </div>

        <div style={{
          marginTop: '12px',
          fontSize: '11px',
          color: '#b7e4c7',
          lineHeight: 1.6,
          background: '#0a1f14',
          padding: '10px',
          borderRadius: '8px',
        }}>
          <strong style={{ color: '#2196f3' }}>サーブ権はパートナー(サーバー2)に移動、得点は入らない</strong>。位置はそのまま、🏓マークだけパートナーに。まだ相手にサーブ権は渡らない(第2のチャンス)。
        </div>
      </div>

      {/* フォルトケース②：サーバー2のフォルト */}
      <div style={{
        background: '#143d24',
        borderRadius: '14px',
        padding: '14px',
        border: '2px solid #ff6b35',
      }}>
        <div style={{
          background: '#ff6b35',
          color: '#fff',
          borderRadius: '8px',
          padding: '6px 10px',
          fontSize: '12px',
          fontWeight: 900,
          marginBottom: '12px',
          display: 'inline-block',
        }}>
          🔴 サーバー2のフォルト → サイドアウト(相手へ)
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          gap: '8px',
          alignItems: 'center',
        }}>
          {/* Before */}
          <CourtDiagramMini
            label="BEFORE"
            score="サーバー2"
            myLeft="👤自分"
            myRight="🏓パー"
            oppLeft="敵2"
            oppRight="敵1"
          />

          <div style={{
            fontSize: '22px',
            color: '#ff6b35',
            fontWeight: 900,
            textAlign: 'center',
          }}>
            →
          </div>

          {/* After */}
          <CourtDiagramMini
            label="AFTER"
            score="相手サーブ"
            myLeft="👤自分"
            myRight="👤パー"
            oppLeft="👤敵2"
            oppRight="🏓敵1"
            arrow={{ from: 'myRight', to: 'oppRight', color: '#ff6b35' }}
          />
        </div>

        <div style={{
          marginTop: '12px',
          fontSize: '11px',
          color: '#b7e4c7',
          lineHeight: 1.6,
          background: '#0a1f14',
          padding: '10px',
          borderRadius: '8px',
        }}>
          <strong style={{ color: '#ff6b35' }}>サーブ権が相手チームに丸ごと移動(サイドアウト)、得点は入らない</strong>。自分たちは位置そのまま、相手の右側の人(敵1)がサーバー1としてサーブ開始。
        </div>
      </div>

      {/* 凡例 */}
      <div style={{
        background: '#143d24',
        borderRadius: '10px',
        padding: '10px',
        border: '1px solid #2d6a4f',
        display: 'flex',
        gap: '12px',
        justifyContent: 'center',
        flexWrap: 'wrap',
        fontSize: '11px',
        color: '#b7e4c7',
      }}>
        <div>🏓 = 今サーブする人</div>
        <div>👤 = サーブしない人</div>
      </div>

      {/* レシーブ側が勝った場合の補足 */}
      <div style={{
        background: 'linear-gradient(135deg, #1a4d2e 0%, #143d24 100%)',
        borderRadius: '12px',
        padding: '14px',
        border: '1px dashed #b7e4c7',
      }}>
        <div style={{
          fontSize: '11px',
          color: '#b7e4c7',
          fontWeight: 800,
          letterSpacing: '1px',
          marginBottom: '8px',
        }}>
          ❓ レシーブ側がラリーに勝った場合は？
        </div>
        <p style={{ margin: 0, fontSize: '12px', color: '#e8f5e9', lineHeight: 1.6 }}>
          通常スコアリングでは<strong style={{ color: '#ffd60a' }}>得点は入らない</strong>。サーブ権獲得のチャンスになるだけ(= 上記の🔵または🔴と同じ結果)。得点できるのはサーブ側のみ。
        </p>
      </div>
    </div>
  );
}

function CourtDiagramMini({ label, score, myLeft, myRight, oppLeft, oppRight, arrow }) {
  const cellStyle = {
    fontFamily: 'Menlo, Monaco, "Courier New", monospace',
    fontSize: '11px',
    color: '#fff',
    textAlign: 'center',
    padding: '10px 4px',
    background: '#1a4d2e',
    fontWeight: 700,
    letterSpacing: '0',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  };

  const oppCellStyle = {
    ...cellStyle,
    background: '#2d1f1f',
    color: '#b7e4c7',
    fontWeight: 500,
  };

  // 矢印位置の計算
  // セル位置は0=左上, 1=右上, 2=左下, 3=右下
  // 実際の図は: 自分チーム(上段) = 2,3、相手チーム(下段) = 0,1
  const getArrowSvg = () => {
    if (!arrow) return null;

    // 各セルの中心座標（%表記）
    // 自分チーム上段: y=15%, 相手チーム下段: y=85%
    // ネットは y=50%
    const positions = {
      myLeft: { x: 25, y: 18 },
      myRight: { x: 75, y: 18 },
      oppLeft: { x: 25, y: 82 },
      oppRight: { x: 75, y: 82 },
    };

    const from = positions[arrow.from];
    const to = positions[arrow.to];
    if (!from || !to) return null;

    return (
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 10,
        }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <marker
            id={`arrowhead-${arrow.color.replace('#', '')}`}
            markerWidth="6"
            markerHeight="6"
            refX="5"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 6 3, 0 6" fill={arrow.color} />
          </marker>
        </defs>
        <line
          x1={from.x}
          y1={from.y}
          x2={to.x}
          y2={to.y}
          stroke={arrow.color}
          strokeWidth="2"
          strokeDasharray="3,2"
          markerEnd={`url(#arrowhead-${arrow.color.replace('#', '')})`}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    );
  };

  return (
    <div>
      <div style={{
        fontSize: '9px',
        letterSpacing: '2px',
        color: '#ffd60a',
        fontWeight: 800,
        textAlign: 'center',
        marginBottom: '4px',
      }}>
        {label}
      </div>

      <div style={{
        border: '2px solid #ffd60a',
        borderRadius: '6px',
        overflow: 'hidden',
        background: '#0a1f14',
        position: 'relative',
      }}>
        {/* 自分チーム */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1px',
          background: '#ffd60a',
        }}>
          <div style={cellStyle}>{myLeft}</div>
          <div style={cellStyle}>{myRight}</div>
        </div>

        {/* ネット */}
        <div style={{
          background: '#ffd60a',
          color: '#0a1f14',
          textAlign: 'center',
          fontSize: '8px',
          fontWeight: 900,
          letterSpacing: '3px',
          padding: '2px 0',
        }}>
          ━━━ NET ━━━
        </div>

        {/* 相手チーム */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1px',
          background: '#ffd60a',
        }}>
          <div style={oppCellStyle}>{oppLeft}</div>
          <div style={oppCellStyle}>{oppRight}</div>
        </div>

        {/* 矢印オーバーレイ */}
        {getArrowSvg()}
      </div>

      <div style={{
        fontSize: '10px',
        color: '#ffd60a',
        textAlign: 'center',
        marginTop: '4px',
        fontWeight: 700,
      }}>
        {score}
      </div>
    </div>
  );
}

function ScorePositionTable() {
  const rows = [
    { score: '0（スタート）', position: '右', note: '偶数' },
    { score: '1', position: '左', note: '奇数' },
    { score: '2', position: '右', note: '偶数' },
    { score: '3', position: '左', note: '奇数' },
    { score: '4', position: '右', note: '偶数' },
    { score: '5', position: '左', note: '奇数' },
  ];

  return (
    <div style={{
      background: '#143d24',
      borderRadius: '12px',
      border: '1px solid #2d6a4f',
      overflow: 'hidden',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.4fr 1fr 1fr',
        background: '#0a1f14',
        padding: '10px 8px',
        borderBottom: '2px solid #ffd60a',
      }}>
        <div style={{ fontSize: '11px', color: '#ffd60a', fontWeight: 800 }}>自分のスコア</div>
        <div style={{ fontSize: '11px', color: '#ffd60a', fontWeight: 800, textAlign: 'center' }}>サーブ位置</div>
        <div style={{ fontSize: '11px', color: '#ffd60a', fontWeight: 800, textAlign: 'center' }}>偶奇</div>
      </div>
      {rows.map((row, i) => (
        <div key={i} style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr 1fr',
          padding: '10px 8px',
          borderBottom: i < rows.length - 1 ? '1px solid #2d6a4f' : 'none',
          fontSize: '13px',
          alignItems: 'center',
        }}>
          <div style={{ color: '#e8f5e9' }}>{row.score}</div>
          <div style={{
            color: row.position === '右' ? '#4caf50' : '#ff6b35',
            textAlign: 'center',
            fontWeight: 800,
          }}>{row.position}側</div>
          <div style={{
            color: '#b7e4c7',
            textAlign: 'center',
            fontSize: '11px',
          }}>{row.note}</div>
        </div>
      ))}
    </div>
  );
}

function ScoreCompareTable() {
  const rows = [
    { label: 'スコアの数字', singles: '2つ（自分-相手）', doubles: '3つ（自分-相手-サーバー番号）' },
    { label: 'サーバー数', singles: '1人', doubles: '2人（順番にサーブ）' },
    { label: '開始時のコール', singles: '「0-0」', doubles: '「0-0-2」' },
    { label: '位置ルール', singles: '偶数=右/奇数=左', doubles: '偶数=右/奇数=左' },
    { label: 'サイドアウト', singles: '即相手にサーブ権', doubles: 'サーバー2まで順番' },
  ];

  return (
    <div style={{
      background: '#143d24',
      borderRadius: '12px',
      border: '1px solid #2d6a4f',
      overflow: 'hidden',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        background: '#0a1f14',
        padding: '10px 8px',
        borderBottom: '2px solid #ffd60a',
      }}>
        <div style={{ fontSize: '11px', color: '#ffd60a', fontWeight: 800 }}>項目</div>
        <div style={{ fontSize: '11px', color: '#4caf50', fontWeight: 800, textAlign: 'center' }}>シングル</div>
        <div style={{ fontSize: '11px', color: '#ff6b35', fontWeight: 800, textAlign: 'center' }}>ダブルス</div>
      </div>
      {rows.map((row, i) => (
        <div key={i} style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          padding: '10px 8px',
          borderBottom: i < rows.length - 1 ? '1px solid #2d6a4f' : 'none',
          fontSize: '11px',
          alignItems: 'center',
          gap: '6px',
        }}>
          <div style={{ color: '#e8f5e9', fontSize: '12px' }}>{row.label}</div>
          <div style={{ color: '#b7e4c7', textAlign: 'center', lineHeight: 1.4 }}>
            {row.singles}
          </div>
          <div style={{ color: '#b7e4c7', textAlign: 'center', lineHeight: 1.4 }}>
            {row.doubles}
          </div>
        </div>
      ))}
    </div>
  );
}

function RallyScoringTable() {
  const rows = [
    { label: '得点できる側', traditional: 'サーブ側のみ', rally: 'どちらでも' },
    { label: 'スコアコール', traditional: '3つ（5-3-2）', rally: '2つ（5-3）' },
    { label: 'サーバー数', traditional: '2人（順番）', rally: '1人' },
    { label: 'ゲーム点数', traditional: '11点', rally: '15 or 21点' },
    { label: '試合時間', traditional: 'バラつき大', rally: '一定' },
  ];

  return (
    <div style={{
      background: '#143d24',
      borderRadius: '12px',
      border: '1px solid #2d6a4f',
      overflow: 'hidden',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1.1fr 1fr',
        background: '#0a1f14',
        padding: '10px 8px',
        borderBottom: '2px solid #ffd60a',
      }}>
        <div style={{ fontSize: '11px', color: '#ffd60a', fontWeight: 800 }}>項目</div>
        <div style={{ fontSize: '11px', color: '#4caf50', fontWeight: 800, textAlign: 'center' }}>通常</div>
        <div style={{ fontSize: '11px', color: '#ff6b35', fontWeight: 800, textAlign: 'center' }}>ラリー</div>
      </div>
      {rows.map((row, i) => (
        <div key={i} style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.1fr 1fr',
          padding: '10px 8px',
          borderBottom: i < rows.length - 1 ? '1px solid #2d6a4f' : 'none',
          fontSize: '12px',
          alignItems: 'center',
          gap: '6px',
        }}>
          <div style={{ color: '#e8f5e9' }}>{row.label}</div>
          <div style={{ color: '#b7e4c7', textAlign: 'center' }}>{row.traditional}</div>
          <div style={{ color: '#b7e4c7', textAlign: 'center' }}>{row.rally}</div>
        </div>
      ))}
    </div>
  );
}

// ---------- ラリー詳細 ----------
function RallyDetail() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* イントロ */}
      <DetailCard color="#ffd60a">
        <div style={{ fontSize: '10px', letterSpacing: '2px', color: '#ffd60a', fontWeight: 800, marginBottom: '6px' }}>
          📌 大前提
        </div>
        <h3 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: 900, color: '#fff' }}>
          ラリー中のルール
        </h3>
        <p style={{ margin: 0, fontSize: '13px', color: '#e8f5e9', lineHeight: 1.7 }}>
          サーブ後、ボールが行き来する「ラリー」中に適用されるルール。<strong style={{ color: '#ffd60a' }}>ツーバウンドルール、ボレー、ネット越え、体への接触</strong>など、サーブ・キッチン・スコア以外の重要ルールをここで解説。
        </p>
      </DetailCard>

      {/* ツーバウンドルール */}
      <div>
        <SubSectionTitle>🎾 ツーバウンドルール（最重要）</SubSectionTitle>
        <DetailCard color="#ff6b35">
          <div style={{ fontSize: '10px', letterSpacing: '2px', color: '#ff6b35', fontWeight: 800, marginBottom: '6px' }}>
            ⚠️ 初心者が最もよく破るルール
          </div>
          <p style={{ margin: 0, fontSize: '13px', color: '#e8f5e9', lineHeight: 1.7 }}>
            サーブ後、<strong style={{ color: '#ffd60a' }}>両チームとも1回ずつバウンドさせてから</strong>ボレー（ノーバウンド打ち）が可能になる。
          </p>
        </DetailCard>

        <div style={{ marginTop: '12px' }}>
          <DetailList items={[
            { title: '①サーブ → レシーブ側が1バウンド後に返球', desc: 'サーブされたボールは、必ず1バウンドしてから打ち返す。ノーバウンドで返したらフォルト。' },
            { title: '②リターン → サーブ側が1バウンド後に返球', desc: 'レシーブ側のリターンも、サーブ側が1バウンドさせてから打ち返す必要がある。ネットにダッシュしていきなりボレーはフォルト。' },
            { title: '③3打目以降はボレーOK', desc: '両チームが1バウンドずつ経験した後は、ボレー（ノーバウンド打ち）もグラウンドストローク（バウンド後）も自由。' },
          ]} numbered />
        </div>

        <DetailCard color="#b7e4c7" bg="#143d24">
          <div style={{ fontSize: '12px', color: '#ffd60a', fontWeight: 800, marginBottom: '6px' }}>
            💡 なぜこのルールが存在する？
          </div>
          <p style={{ margin: 0, fontSize: '12px', color: '#b7e4c7', lineHeight: 1.7 }}>
            テニスの「サーブ&ボレー」戦術（サーブ→即ネットダッシュ→ボレー連発）を防ぐため。これにより<strong style={{ color: '#ffd60a' }}>ラリーが長く続き、戦略と技巧が重要なスポーツ</strong>になっている。公平性を保つ最重要ルール。
          </p>
        </DetailCard>

        <DetailCard color="#ff6b35" bg="#143d24">
          <div style={{ fontSize: '12px', color: '#ff6b35', fontWeight: 800, marginBottom: '6px' }}>
            🔍 「ツーバウンド」と「ダブルバウンド」の違い
          </div>
          <p style={{ margin: 0, fontSize: '12px', color: '#b7e4c7', lineHeight: 1.7 }}>
            <strong style={{ color: '#ffd60a' }}>ツーバウンド</strong>=ラリー開始時の必須ルール（両チーム1バウンドずつ）。<br/>
            <strong style={{ color: '#ffd60a' }}>ダブルバウンド</strong>=1チーム側で2回バウンド（常にフォルト）。<br/>
            用語が似ているので混同しやすいが、別物。
          </p>
        </DetailCard>
      </div>

      {/* ボレーの基本 */}
      <div>
        <SubSectionTitle>💨 ボレーの基本ルール</SubSectionTitle>
        <DetailList items={[
          { title: 'ボレー = ノーバウンド打ち', desc: 'ボールがバウンドする前に打つショット。ツーバウンドルール後なら自由にボレーできる。' },
          { title: 'キッチン内でのボレーは禁止', desc: 'ノンボレーゾーン(キッチン)内ではボレー禁止。詳細はキッチン詳細ルール参照。' },
          { title: 'ボレー後のモメンタムに注意', desc: 'ボレー後の勢いでキッチンに入るとフォルト。打つ前に両足の位置を確認。' },
        ]} />
      </div>

      {/* ダブル/トリプルヒット */}
      <div>
        <SubSectionTitle>🔁 ダブルヒット・トリプルヒット（2026年改定）</SubSectionTitle>
        <DetailCard color="#4caf50">
          <div style={{ fontSize: '10px', letterSpacing: '2px', color: '#4caf50', fontWeight: 800, marginBottom: '6px' }}>
            ✅ 2026年から明文化
          </div>
          <p style={{ margin: 0, fontSize: '13px', color: '#e8f5e9', lineHeight: 1.7 }}>
            1回のスイングでパドルにボールが<strong style={{ color: '#ffd60a' }}>2回・3回・それ以上当たっても合法</strong>。条件は「一方向の連続した動き」で、意図的でないこと。
          </p>
        </DetailCard>

        <div style={{ marginTop: '12px' }}>
          <DetailList items={[
            { title: '✅ 合法：連続した1スイング内の接触', desc: '振り抜く途中でパドルにボールが2〜3回当たるケース。一方向の動きであればOK。' },
            { title: '❌ フォルト：キャリー（ボール持ち運び）', desc: 'パドル面にボールを乗せて運ぶ・押し出すのはキャリー違反。明確なフォルト。' },
            { title: '❌ フォルト：意図的な複数接触', desc: '故意にボールを何度も叩く動作はフォルト。自然な1スイング以外はNG。' },
          ]} />
        </div>

        <DetailCard color="#b7e4c7" bg="#143d24">
          <p style={{ margin: 0, fontSize: '12px', color: '#b7e4c7', lineHeight: 1.7 }}>
            昔は「ダブルヒット=フォルト」と誤解する選手が多かったが、2024年にダブルヒット、2026年にトリプルヒット以上も<strong style={{ color: '#ffd60a' }}>正式に合法化</strong>された。
          </p>
        </DetailCard>
      </div>

      {/* ネット越え・プレーン違反 */}
      <div>
        <SubSectionTitle>🌐 ネット越え（プレーン違反）</SubSectionTitle>
        <DetailCard color="#ff6b35">
          <p style={{ margin: 0, fontSize: '13px', color: '#e8f5e9', lineHeight: 1.7 }}>
            ラリー中、<strong style={{ color: '#ffd60a' }}>打つ前にネット越しに手を伸ばして相手コート側で打つ</strong>のはフォルト（プレーン違反）。打つ瞬間はボールが自分側に来ている必要がある。
          </p>
        </DetailCard>

        <div style={{ marginTop: '12px' }}>
          <DetailList items={[
            { title: '✅ フォロースルーはOK', desc: '打った後、スイングの勢いでパドルがネットを越えるのはOK。打つ瞬間の位置が重要。' },
            { title: '❌ 打つ前にネット越え', desc: '手やパドルを相手コート上空に伸ばして打つのはフォルト。' },
            { title: '❌ ネットや相手コートに触れる', desc: 'ラリー中、パドル・体・服などがネットや相手コート・相手選手に触れたらフォルト。' },
          ]} />
        </div>
      </div>

      {/* オーバー・アンド・バック */}
      <div>
        <SubSectionTitle>🌀 オーバー・アンド・バック・ルール</SubSectionTitle>
        <DetailCard color="#4caf50">
          <div style={{ fontSize: '10px', letterSpacing: '2px', color: '#4caf50', fontWeight: 800, marginBottom: '6px' }}>
            ✅ プレーン違反の例外
          </div>
          <p style={{ margin: 0, fontSize: '13px', color: '#e8f5e9', lineHeight: 1.7 }}>
            相手の打球が<strong style={{ color: '#ffd60a' }}>自分コートに1バウンド→スピンや風で相手コート側に戻った</strong>場合のみ、ネット越しに打ちに行ってOK。
          </p>
        </DetailCard>

        <div style={{ marginTop: '12px' }}>
          <DetailList items={[
            { title: '条件①自分コートに1バウンド', desc: '相手の打球が、自分側のコートで一度バウンドすること。' },
            { title: '条件②スピンや風で相手側に戻る', desc: 'バックスピンや強風で、触れる前にネットを越えて相手コート側に戻る。' },
            { title: '合法な打ち方', desc: 'ネットを越える or ポストの外側を回り込む(高さ自由)。ネット・ポスト・相手コートに触れなければOK。' },
            { title: '❌ ネット下をくぐらせるのはNG', desc: 'ボールをネット下やポストとネットの隙間を通すのは常にフォルト。' },
          ]} />
        </div>
      </div>

      {/* 体・服への接触 */}
      <div>
        <SubSectionTitle>👤 体・服・パドル外接触</SubSectionTitle>
        <DetailCard color="#ff6b35">
          <p style={{ margin: 0, fontSize: '13px', color: '#e8f5e9', lineHeight: 1.7 }}>
            ボールが<strong style={{ color: '#ffd60a' }}>パドル以外の体の部分</strong>に当たったらフォルト。服・髪・帽子もすべて同じ扱い。
          </p>
        </DetailCard>

        <div style={{ marginTop: '12px' }}>
          <DetailList items={[
            { title: '❌ 基本：体への接触はフォルト', desc: 'ボールが体や服に当たった瞬間にラリー終了。アウトになりそうでも、当たったら相手の得点。' },
            { title: '✅ 例外：パドル持つ手の手首より下', desc: 'パドルを握っている手の「手首より下」に当たった場合、パドルの延長扱いでセーフ(Rule 7.H)。手首より上はフォルト。' },
            { title: '❌ 持ち物落下もフォルト', desc: 'ラリー中に帽子・サングラス・タオルなどが落ちて、それにボールが当たってもフォルト。' },
          ]} />
        </div>
      </div>

      {/* 妨害とハインダー */}
      <div>
        <SubSectionTitle>🚧 妨害とハインダーの違い</SubSectionTitle>
        <DetailCard color="#ffd60a">
          <p style={{ margin: 0, fontSize: '13px', color: '#e8f5e9', lineHeight: 1.7 }}>
            両方とも「プレーを邪魔する要素」だが、<strong style={{ color: '#ffd60a' }}>発生原因と結果が違う</strong>。
          </p>
        </DetailCard>

        <div style={{ marginTop: '12px' }}>
          <HinderVsDistractionTable />
        </div>

        <div style={{ marginTop: '12px' }}>
          <DetailList items={[
            { title: '🌪️ ハインダー例：他コートのボール侵入', desc: '隣のコートからボールが転がってきた。即ストップしてリプレイ(やり直し)。' },
            { title: '🌪️ ハインダー例：虫が選手に当たる', desc: '突然の外的要因。プレイヤーの責任ではないのでリプレイ。' },
            { title: '😤 妨害例：相手が叫ぶ', desc: '相手が打つ瞬間に「アウト!」と大声を出した。妨害扱いでフォルト。' },
            { title: '😤 妨害例：わざと注意を逸らす', desc: 'パドルを振り回す・足を踏み鳴らすなど。故意の妨害はフォルト。' },
          ]} />
        </div>
      </div>

      {/* アウトコール */}
      <div>
        <SubSectionTitle>📢 アウトコールのタイミング</SubSectionTitle>
        <DetailCard color="#ff6b35">
          <div style={{ fontSize: '10px', letterSpacing: '2px', color: '#ff6b35', fontWeight: 800, marginBottom: '6px' }}>
            ⚠️ 2026年から厳格化
          </div>
          <p style={{ margin: 0, fontSize: '13px', color: '#e8f5e9', lineHeight: 1.7 }}>
            アウトコールは<strong style={{ color: '#ffd60a' }}>即座に</strong>行う必要あり。遅れたコールは「イン」扱い。
          </p>
        </DetailCard>

        <div style={{ marginTop: '12px' }}>
          <DetailList items={[
            { title: 'バウンド後は即コール', desc: 'ボールがバウンドしてすぐに「アウト!」と声に出すか、ハンドシグナル。遅れたら「イン」扱いでそのままプレー継続。' },
            { title: '空中でのアウトコールはコミュニケーション', desc: 'ボールが空中にある時の「アウト!」はパートナーへの合図扱い。ラインコールとしては無効。' },
            { title: 'パートナー判定が割れたら「イン」', desc: '一人が「アウト」、もう一人が「イン」と判定したら、疑いありとして「イン」が優先(Rule 6.D.9)。' },
            { title: '観客への確認はNG', desc: '2026年から「must not(絶対禁止)」に強化。観客や外野に判定を求めると警告・ペナルティ対象。' },
          ]} />
        </div>
      </div>

      {/* ネットポストルール */}
      <div>
        <SubSectionTitle>🏁 ネットポスト接触ルール</SubSectionTitle>
        <DetailList items={[
          { title: '❌ ラリー中のポスト接触は打った側のフォルト', desc: 'ボールが飛ぶ途中でネットポストに当たったら、そのボールを打った側のフォルト。即失点となる。' },
          { title: '✅ 2026年の例外：バウンド後のポスト接触', desc: 'ボールが適切にネットを越えて自コートにバウンドした後、風やスピンで戻ってポストに当たった場合は自動フォルトにならない。' },
          { title: '❌ 選手がネットポストに触れたらフォルト', desc: 'ラリー中にパドル・体・服などがネットポストに触れたら、触れた選手のフォルト。' },
        ]} />
      </div>

      {/* 予備ボール */}
      <div>
        <SubSectionTitle>🎾 予備ボールのルール（2026年）</SubSectionTitle>
        <DetailCard color="#ff6b35">
          <p style={{ margin: 0, fontSize: '13px', color: '#e8f5e9', lineHeight: 1.7 }}>
            2026年から、ラリー中に<strong style={{ color: '#ffd60a' }}>予備ボールが相手から見えたり、コートに落ちたりしたらフォルト</strong>。
          </p>
        </DetailCard>

        <div style={{ marginTop: '12px' }}>
          <DetailList items={[
            { title: '❌ ポケットからはみ出すのもNG', desc: 'ポケットに入れた予備ボールが少しでも見えたらフォルト。きちんと隠す必要あり。' },
            { title: '❌ 落下もフォルト', desc: 'ラリー中にポケットから落ちてコートに転がったらフォルト。安全・公平性のため。' },
          ]} />
        </div>
      </div>

      {/* ラリー終了条件まとめ */}
      <div>
        <SubSectionTitle>🏁 ラリーが終わる（フォルト発生）条件</SubSectionTitle>
        <RallyEndTable />
      </div>

      {/* 背景 */}
      <DetailCard color="#b7e4c7" bg="#143d24">
        <div style={{ fontSize: '10px', letterSpacing: '2px', color: '#b7e4c7', fontWeight: 800, marginBottom: '6px' }}>
          💡 背景
        </div>
        <h3 style={{ margin: '0 0 8px', fontSize: '14px', fontWeight: 900, color: '#fff' }}>
          ラリーのルールが多い理由
        </h3>
        <p style={{ margin: 0, fontSize: '13px', color: '#e8f5e9', lineHeight: 1.7 }}>
          ピックルボールは「<strong style={{ color: '#ffd60a' }}>パワーではなく頭脳戦</strong>」にするため、ラリー中に様々なルールがある。これらを知っておくと「今のはフォルト?」という議論を避けられる。2026年は特に「観客相談禁止」「予備ボール」など、公平性・安全性強化の改定が多い。
        </p>
      </DetailCard>
    </div>
  );
}

function HinderVsDistractionTable() {
  const rows = [
    { label: '発生原因', hinder: '外的要因(他コートボール等)', distraction: '選手の故意な行為' },
    { label: '結果', hinder: 'リプレイ(やり直し)', distraction: 'フォルト' },
    { label: '例', hinder: '虫・風飛び物・他コート', distraction: '叫ぶ・パドル振り回す' },
    { label: '誰の責任？', hinder: '誰でもない', distraction: '行った選手' },
  ];

  return (
    <div style={{
      background: '#143d24',
      borderRadius: '12px',
      border: '1px solid #2d6a4f',
      overflow: 'hidden',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '0.8fr 1fr 1fr',
        background: '#0a1f14',
        padding: '10px 8px',
        borderBottom: '2px solid #ffd60a',
      }}>
        <div style={{ fontSize: '11px', color: '#ffd60a', fontWeight: 800 }}>項目</div>
        <div style={{ fontSize: '11px', color: '#4caf50', fontWeight: 800, textAlign: 'center' }}>ハインダー</div>
        <div style={{ fontSize: '11px', color: '#ff6b35', fontWeight: 800, textAlign: 'center' }}>妨害</div>
      </div>
      {rows.map((row, i) => (
        <div key={i} style={{
          display: 'grid',
          gridTemplateColumns: '0.8fr 1fr 1fr',
          padding: '10px 8px',
          borderBottom: i < rows.length - 1 ? '1px solid #2d6a4f' : 'none',
          fontSize: '11px',
          alignItems: 'center',
          gap: '6px',
        }}>
          <div style={{ color: '#e8f5e9', fontSize: '12px' }}>{row.label}</div>
          <div style={{ color: '#b7e4c7', textAlign: 'center', lineHeight: 1.4 }}>
            {row.hinder}
          </div>
          <div style={{ color: '#b7e4c7', textAlign: 'center', lineHeight: 1.4 }}>
            {row.distraction}
          </div>
        </div>
      ))}
    </div>
  );
}

function RallyEndTable() {
  const conditions = [
    { cat: 'バウンド', desc: 'ボールが1チーム側で2回バウンド(ダブルバウンド)' },
    { cat: 'アウト', desc: 'ボールがコート外に着地' },
    { cat: 'ネット', desc: 'ボールがネットに掛かって自コート側に落ちる' },
    { cat: 'キッチン', desc: 'ボレー中にキッチン接触またはモメンタムでキッチン入り' },
    { cat: 'ツーバウンド違反', desc: 'サーブ後の最初の2打でボレーした' },
    { cat: '体接触', desc: 'ボールがパドル以外の体・服・持ち物に当たった' },
    { cat: 'ネット接触', desc: '選手・パドル・服などがネット/ポストに触れた' },
    { cat: 'プレーン違反', desc: '打つ前に手やパドルが相手コート上空に侵入' },
    { cat: 'ダブルヒット違法', desc: '一方向でない・意図的・キャリーがあった' },
    { cat: 'アウトコール誤り', desc: 'バウンド後「アウト」と叫んだが実はインだった' },
    { cat: '観客相談', desc: '観客に判定を求めた(2026年から厳格化)' },
    { cat: '予備ボール', desc: 'ポケットから予備ボールが見えた/落ちた' },
  ];

  return (
    <div style={{
      background: '#143d24',
      borderRadius: '12px',
      border: '1px solid #2d6a4f',
      overflow: 'hidden',
    }}>
      {conditions.map((c, i) => (
        <div key={i} style={{
          display: 'grid',
          gridTemplateColumns: '0.8fr 1.8fr',
          padding: '10px',
          borderBottom: i < conditions.length - 1 ? '1px solid #2d6a4f' : 'none',
          fontSize: '12px',
          gap: '10px',
        }}>
          <div style={{
            color: '#ff6b35',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <span>❌</span>
            <span>{c.cat}</span>
          </div>
          <div style={{ color: '#b7e4c7', lineHeight: 1.5 }}>{c.desc}</div>
        </div>
      ))}
    </div>
  );
}

// ---------- サブコンポーネント ----------
function SubSectionTitle({ children }) {
  return (
    <h3 style={{
      fontSize: '15px',
      fontWeight: 800,
      color: '#ffd60a',
      margin: '0 0 10px',
      paddingBottom: '6px',
      borderBottom: '1px solid #2d6a4f',
    }}>
      {children}
    </h3>
  );
}

function DetailCard({ children, color = '#ffd60a', bg = '#143d24' }) {
  return (
    <div style={{
      background: bg,
      borderRadius: '12px',
      padding: '14px',
      borderLeft: `4px solid ${color}`,
    }}>
      {children}
    </div>
  );
}

function DetailList({ items, numbered = false }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {items.map((item, i) => (
        <div key={i} style={{
          background: '#143d24',
          borderRadius: '10px',
          padding: '12px',
          borderLeft: '3px solid #2d6a4f',
          display: 'flex',
          gap: '10px',
        }}>
          {numbered && (
            <div style={{
              width: '24px', height: '24px', borderRadius: '50%',
              background: '#ffd60a', color: '#0a1f14',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 900, fontSize: '12px', flexShrink: 0,
            }}>{i + 1}</div>
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>
              {item.title}
            </div>
            <p style={{ margin: 0, fontSize: '12px', color: '#b7e4c7', lineHeight: 1.6 }}>
              {item.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function CompareTable() {
  const rows = [
    { label: 'パドルの弧（下から上）', volley: '必須', drop: '規制なし' },
    { label: '腰より下で接触', volley: '必須', drop: '規制なし' },
    { label: 'パドルヘッドが手首より下', volley: '必須', drop: '規制なし' },
    { label: 'サイドアーム', volley: 'NG', drop: 'OK' },
    { label: '上から下への振り', volley: 'NG', drop: 'OK' },
    { label: 'スピン打ち', volley: '制限あり', drop: '自由' },
  ];

  return (
    <div style={{
      background: '#143d24',
      borderRadius: '12px',
      border: '1px solid #2d6a4f',
      overflow: 'hidden',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.4fr 1fr 1fr',
        background: '#0a1f14',
        padding: '10px 8px',
        borderBottom: '2px solid #ffd60a',
      }}>
        <div style={{ fontSize: '11px', color: '#ffd60a', fontWeight: 800 }}>項目</div>
        <div style={{ fontSize: '11px', color: '#ff6b35', fontWeight: 800, textAlign: 'center' }}>バレー</div>
        <div style={{ fontSize: '11px', color: '#4caf50', fontWeight: 800, textAlign: 'center' }}>ドロップ</div>
      </div>
      {rows.map((row, i) => (
        <div key={i} style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr 1fr',
          padding: '10px 8px',
          borderBottom: i < rows.length - 1 ? '1px solid #2d6a4f' : 'none',
          fontSize: '12px',
          alignItems: 'center',
        }}>
          <div style={{ color: '#e8f5e9' }}>{row.label}</div>
          <div style={{
            color: row.volley.includes('NG') || row.volley.includes('必須') ? '#ff6b35' : '#ffd60a',
            textAlign: 'center',
            fontWeight: 700,
          }}>{row.volley}</div>
          <div style={{
            color: row.drop.includes('OK') || row.drop.includes('自由') || row.drop.includes('なし') ? '#4caf50' : '#ffd60a',
            textAlign: 'center',
            fontWeight: 700,
          }}>{row.drop}</div>
        </div>
      ))}
    </div>
  );
}

function FaultTable() {
  const faults = [
    { name: 'フットフォルト', desc: 'ベースラインを踏んだ、両足が空中' },
    { name: 'ショート', desc: 'キッチンまたはキッチンラインに着地' },
    { name: 'オーバー/ワイド', desc: 'サービスエリア外に落ちた' },
    { name: '対角違反', desc: '同じ側のコートに入れた' },
    { name: 'ハイコンタクト', desc: '腰より上で打った（バレーサーブ）' },
    { name: 'パドルヘッド違反', desc: '手首より上（バレーサーブ）' },
    { name: '弧なし違反', desc: '横振り・下向き振り（バレーサーブ）' },
    { name: 'スピン操作', desc: '手でボールに回転を与えた' },
    { name: '推進リリース', desc: 'ドロップサーブで投げ下ろした' },
    { name: '時間切れ', desc: 'コール後10秒経過' },
  ];

  return (
    <div style={{
      background: '#143d24',
      borderRadius: '12px',
      border: '1px solid #2d6a4f',
      overflow: 'hidden',
    }}>
      {faults.map((f, i) => (
        <div key={i} style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.5fr',
          padding: '10px',
          borderBottom: i < faults.length - 1 ? '1px solid #2d6a4f' : 'none',
          fontSize: '12px',
          gap: '10px',
        }}>
          <div style={{
            color: '#ff6b35',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <span>❌</span>
            <span>{f.name}</span>
          </div>
          <div style={{ color: '#b7e4c7', lineHeight: 1.5 }}>{f.desc}</div>
        </div>
      ))}
    </div>
  );
}

function StrategyCard({ title, color, items }) {
  return (
    <div style={{
      background: '#143d24',
      borderRadius: '12px',
      padding: '14px',
      borderLeft: `4px solid ${color}`,
    }}>
      <h4 style={{
        margin: '0 0 10px',
        fontSize: '14px',
        fontWeight: 800,
        color: color,
      }}>
        {title}
      </h4>
      <ul style={{ margin: 0, paddingLeft: '18px', listStyle: 'none' }}>
        {items.map((item, i) => (
          <li key={i} style={{
            fontSize: '12px',
            color: '#e8f5e9',
            lineHeight: 1.7,
            position: 'relative',
            paddingLeft: '14px',
          }}>
            <span style={{
              position: 'absolute',
              left: 0,
              color: color,
              fontWeight: 900,
            }}>▸</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ==================== コート ====================
function CourtTab() {
  return (
    <div>
      <SectionTitle>コートの本当のサイズ</SectionTitle>
      <p style={{ fontSize: '13px', color: '#b7e4c7', marginBottom: '16px', lineHeight: 1.6 }}>
        バドミントンのダブルスコートと同じ大きさ。テニスコートの約3分の1。
      </p>

      {/* Court Diagram */}
      <CourtDiagram />

      <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <StatCard label="全体の長さ" value="13.41m" sub="（44フィート）" />
        <StatCard label="全体の幅" value="6.1m" sub="（20フィート）" />
        <StatCard label="キッチンの幅" value="2.13m" sub="（7フィート）" />
        <StatCard label="サービスコート奥行" value="4.57m" sub="（15フィート）" />
      </div>

      <SectionTitle style={{ marginTop: '32px' }}>ネットの高さ</SectionTitle>
      <div style={{
        background: 'linear-gradient(135deg, #1a4d2e 0%, #143d24 100%)',
        borderRadius: '14px',
        padding: '18px',
        border: '1px solid #2d6a4f',
      }}>
        <NetDiagram />
        <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <StatCard label="中央の高さ" value="86cm" sub="（34インチ）" highlight />
          <StatCard label="サイドの高さ" value="91cm" sub="（36インチ）" />
        </div>
        <p style={{ fontSize: '13px', color: '#b7e4c7', marginTop: '12px', marginBottom: 0, lineHeight: 1.6 }}>
          💡 真ん中が少し低いのがポイント。テニスネットとほぼ同じ高さです。
        </p>
      </div>
    </div>
  );
}

function CourtDiagram() {
  return (
    <div style={{ background: '#143d24', borderRadius: '14px', padding: '16px', border: '1px solid #2d6a4f' }}>
      <svg viewBox="0 0 300 220" style={{ width: '100%', height: 'auto' }}>
        {/* Court background */}
        <rect x="20" y="20" width="260" height="180" fill="#2d6a4f" stroke="#fff" strokeWidth="2" />
        
        {/* Kitchen (Non-Volley Zone) - top */}
        <rect x="20" y="80" width="260" height="30" fill="#ff6b35" opacity="0.3" stroke="#fff" strokeWidth="1.5" />
        {/* Kitchen - bottom */}
        <rect x="20" y="110" width="260" height="30" fill="#ff6b35" opacity="0.3" stroke="#fff" strokeWidth="1.5" />
        
        {/* Center line top */}
        <line x1="150" y1="20" x2="150" y2="80" stroke="#fff" strokeWidth="1.5" />
        {/* Center line bottom */}
        <line x1="150" y1="140" x2="150" y2="200" stroke="#fff" strokeWidth="1.5" />
        
        {/* Net */}
        <line x1="20" y1="110" x2="280" y2="110" stroke="#ffd60a" strokeWidth="3" />
        
        {/* Labels */}
        <text x="150" y="50" fill="#fff" fontSize="10" textAnchor="middle" fontWeight="700">サービスコート</text>
        <text x="150" y="180" fill="#fff" fontSize="10" textAnchor="middle" fontWeight="700">サービスコート</text>
        <text x="150" y="97" fill="#fff" fontSize="9" textAnchor="middle" fontWeight="700">キッチン</text>
        <text x="150" y="128" fill="#fff" fontSize="9" textAnchor="middle" fontWeight="700">キッチン</text>
        <text x="290" y="114" fill="#ffd60a" fontSize="9" fontWeight="700">ネット</text>
        
        {/* Dimensions */}
        <text x="150" y="215" fill="#b7e4c7" fontSize="9" textAnchor="middle">← 6.1m →</text>
        <text x="10" y="113" fill="#b7e4c7" fontSize="9" textAnchor="middle" transform="rotate(-90, 10, 113)">13.41m</text>
      </svg>
    </div>
  );
}

function NetDiagram() {
  return (
    <svg viewBox="0 0 300 80" style={{ width: '100%', height: 'auto' }}>
      {/* Ground */}
      <line x1="10" y1="70" x2="290" y2="70" stroke="#b7e4c7" strokeWidth="2" />
      
      {/* Net posts */}
      <line x1="40" y1="70" x2="40" y2="15" stroke="#fff" strokeWidth="2" />
      <line x1="260" y1="70" x2="260" y2="15" stroke="#fff" strokeWidth="2" />
      
      {/* Net curve (higher at sides, lower in middle) */}
      <path d="M 40 15 Q 150 25 260 15" stroke="#ffd60a" strokeWidth="2" fill="none" />
      <path d="M 40 15 L 40 70 L 260 70 L 260 15" stroke="#ffd60a" strokeWidth="1" fill="#ffd60a" opacity="0.2" />
      <path d="M 40 15 Q 150 25 260 15 L 260 70 L 40 70 Z" fill="#ffd60a" opacity="0.15" />
      
      {/* Height labels */}
      <text x="40" y="10" fill="#fff" fontSize="10" textAnchor="middle" fontWeight="700">91cm</text>
      <text x="150" y="18" fill="#ffd60a" fontSize="11" textAnchor="middle" fontWeight="900">86cm</text>
      <text x="260" y="10" fill="#fff" fontSize="10" textAnchor="middle" fontWeight="700">91cm</text>
    </svg>
  );
}

// ==================== コール練習シミュレータ ====================
function SimulatorTab({ isPremium, openPaywall }) {
  const [mode, setMode] = useState('sim'); // 'sim' or 'quiz'

  return (
    <div>
      <SectionTitle>スコアコール練習</SectionTitle>

      {/* モード切替タブ */}
      <div style={{
        display: 'flex',
        gap: '6px',
        marginBottom: '16px',
        background: '#143d24',
        borderRadius: '12px',
        padding: '4px',
        border: '1px solid #2d6a4f',
      }}>
        <button
          onClick={() => setMode('sim')}
          style={{
            flex: 1,
            padding: '10px',
            background: mode === 'sim' ? '#ffd60a' : 'transparent',
            color: mode === 'sim' ? '#0a1f14' : '#b7e4c7',
            border: 'none',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: 800,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          📝 シミュレーション
        </button>
        <button
          onClick={() => {
            if (!isPremium) {
              openPaywall('クイズモード');
            } else {
              setMode('quiz');
            }
          }}
          style={{
            flex: 1,
            padding: '10px',
            background: mode === 'quiz' ? '#ffd60a' : 'transparent',
            color: mode === 'quiz' ? '#0a1f14' : '#b7e4c7',
            border: 'none',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: 800,
            cursor: 'pointer',
            fontFamily: 'inherit',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
          }}
        >
          🎮 クイズ
          {!isPremium && <span style={{ fontSize: '10px' }}>🔒</span>}
        </button>
      </div>

      {mode === 'sim' && <SimulatorMode isPremium={isPremium} openPaywall={openPaywall} />}
      {mode === 'quiz' && isPremium && <QuizMode />}
    </div>
  );
}

// ---------- シミュレーションモード ----------
function SimulatorMode({ isPremium, openPaywall }) {
  const FREE_RALLY_LIMIT = 3; // 無料版のラリー制限数(後で調整可)
  const [myScore, setMyScore] = useState(0);
  const [oppScore, setOppScore] = useState(0);
  const [server, setServer] = useState(2);
  const [isMyServe, setIsMyServe] = useState(true);
  const [gameStart, setGameStart] = useState(true);
  const [history, setHistory] = useState([]);
  const [ralliesPlayed, setRalliesPlayed] = useState(0); // ラリー実行回数

  const isLocked = !isPremium && ralliesPlayed >= FREE_RALLY_LIMIT;

  const currentCall = isMyServe
    ? `${myScore} - ${oppScore} - ${server}`
    : `${oppScore} - ${myScore} - ${server}`;

  const winPoint = () => {
    if (!isMyServe || isLocked) return;
    setHistory(h => [...h, { call: currentCall, action: '得点' }]);
    setMyScore(s => s + 1);
    setGameStart(false);
    setRalliesPlayed(r => r + 1);
  };

  const fault = () => {
    if (isLocked) return;
    setHistory(h => [...h, { call: currentCall, action: isMyServe ? 'フォルト' : '相手フォルト' }]);
    if (isMyServe) {
      if (gameStart) {
        setIsMyServe(false);
        setServer(1);
        setGameStart(false);
      } else if (server === 1) {
        setServer(2);
      } else {
        setIsMyServe(false);
        setServer(1);
      }
    } else {
      if (server === 1) {
        setServer(2);
      } else {
        setIsMyServe(true);
        setServer(1);
      }
    }
    setRalliesPlayed(r => r + 1);
  };

  const oppScorePoint = () => {
    if (isMyServe || isLocked) return;
    setHistory(h => [...h, { call: currentCall, action: '相手得点' }]);
    setOppScore(s => s + 1);
    setRalliesPlayed(r => r + 1);
  };

  const reset = () => {
    // リセットはラリーカウントをリセットしない(無料版の制限維持のため)
    // ただし有料版の人のために履歴とスコアはクリア
    setMyScore(0);
    setOppScore(0);
    setServer(2);
    setIsMyServe(true);
    setGameStart(true);
    setHistory([]);
  };

  return (
    <div>
      <p style={{ fontSize: '13px', color: '#b7e4c7', lineHeight: 1.6, marginBottom: '16px' }}>
        得点やフォルトを押すと、次のコールがどうなるか自動計算。流れを体で覚えよう。
      </p>

      {/* 無料版のラリー残数表示 */}
      {!isPremium && (
        <div style={{
          background: isLocked
            ? 'linear-gradient(135deg, #ff6b35 0%, #d84315 100%)'
            : 'rgba(255, 214, 10, 0.1)',
          border: isLocked ? '2px solid #ff6b35' : '1px solid #ffd60a',
          borderRadius: '12px',
          padding: '10px 14px',
          marginBottom: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px',
        }}>
          <div>
            <div style={{
              fontSize: '10px',
              color: isLocked ? '#fff' : '#ffd60a',
              fontWeight: 800,
              letterSpacing: '1px',
              marginBottom: '2px',
            }}>
              {isLocked ? '🔒 無料枠終了' : '🆓 無料版'}
            </div>
            <div style={{
              fontSize: '12px',
              color: isLocked ? '#fff' : '#b7e4c7',
            }}>
              {isLocked
                ? '有料版で無制限に練習できます'
                : `残り ${FREE_RALLY_LIMIT - ralliesPlayed} ラリー`}
            </div>
          </div>
          {isLocked && (
            <button
              onClick={() => openPaywall('コール練習 無制限')}
              style={{
                padding: '8px 12px',
                background: '#0a1f14',
                border: '1px solid #ffd60a',
                color: '#ffd60a',
                borderRadius: '8px',
                fontSize: '11px',
                fontWeight: 900,
                cursor: 'pointer',
                fontFamily: 'inherit',
                whiteSpace: 'nowrap',
              }}
            >
              🔓 解放
            </button>
          )}
        </div>
      )}

      {/* Current Call Display */}
      <div style={{
        background: isMyServe
          ? 'linear-gradient(135deg, #ffd60a 0%, #f9a825 100%)'
          : 'linear-gradient(135deg, #ff6b35 0%, #d84315 100%)',
        borderRadius: '16px',
        padding: '24px 20px',
        textAlign: 'center',
        marginBottom: '16px',
        opacity: isLocked ? 0.4 : 1,
        pointerEvents: isLocked ? 'none' : 'auto',
      }}>
        <div style={{
          fontSize: '10px',
          fontWeight: 800,
          letterSpacing: '2px',
          color: isMyServe ? '#0a1f14' : '#fff',
          marginBottom: '8px',
        }}>
          {isMyServe ? '🏓 あなたのサーブ' : '🏓 相手のサーブ'}
        </div>
        <div style={{
          fontSize: '48px',
          fontWeight: 900,
          color: isMyServe ? '#0a1f14' : '#fff',
          letterSpacing: '-1px',
          fontFamily: "'Courier New', monospace",
        }}>
          {currentCall}
        </div>
        <div style={{
          fontSize: '11px',
          color: isMyServe ? '#0a1f14' : '#fff',
          opacity: 0.8,
          marginTop: '6px',
        }}>
          自分{myScore} - 相手{oppScore} - サーバー{server}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '10px' }}>
        {isMyServe ? (
          <>
            {/* 自分サーブ中：勝ち */}
            <button onClick={winPoint} style={resultBtnStyle('#4caf50', isLocked)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ fontSize: '28px' }}>🎉</div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ fontSize: '15px', fontWeight: 900, color: '#fff', marginBottom: '2px' }}>
                    ラリーに勝った
                  </div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>
                    +1点 自分のチーム
                  </div>
                </div>
              </div>
            </button>

            {/* 自分サーブ中：負け */}
            <button onClick={fault} style={resultBtnStyle('#ff6b35', isLocked)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ fontSize: '28px' }}>😢</div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ fontSize: '15px', fontWeight: 900, color: '#fff', marginBottom: '2px' }}>
                    ラリーに負けた
                  </div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>
                    {gameStart
                      ? 'サーブ権が相手へ (開始時0-0-2ルール)'
                      : server === 1
                        ? 'パートナーがサーバー2 (まだ自分チーム)'
                        : 'サーブ権が相手へ (サイドアウト)'}
                  </div>
                </div>
              </div>
            </button>
          </>
        ) : (
          <>
            {/* 相手サーブ中：自分負け */}
            <button onClick={oppScorePoint} style={resultBtnStyle('#ff6b35', isLocked)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ fontSize: '28px' }}>😢</div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ fontSize: '15px', fontWeight: 900, color: '#fff', marginBottom: '2px' }}>
                    ラリーに負けた
                  </div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>
                    +1点 相手チーム
                  </div>
                </div>
              </div>
            </button>

            {/* 相手サーブ中：自分勝ち */}
            <button onClick={fault} style={resultBtnStyle('#4caf50', isLocked)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ fontSize: '28px' }}>🎉</div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ fontSize: '15px', fontWeight: 900, color: '#fff', marginBottom: '2px' }}>
                    ラリーに勝った
                  </div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>
                    {server === 1
                      ? '相手のサーバー交代 (まだサーブ権は相手)'
                      : 'サーブ権ゲット (得点なし)'}
                  </div>
                </div>
              </div>
            </button>
          </>
        )}
      </div>

      <button
        onClick={reset}
        style={{
          width: '100%',
          padding: '10px',
          background: 'transparent',
          border: '1px solid #2d6a4f',
          color: '#b7e4c7',
          borderRadius: '10px',
          fontSize: '13px',
          cursor: 'pointer',
          marginBottom: '20px',
          fontFamily: 'inherit',
        }}
      >
        🔄 最初からやり直す
      </button>

      {/* History */}
      {history.length > 0 && (
        <>
          <SectionTitle>履歴</SectionTitle>
          <div style={{
            background: '#143d24',
            borderRadius: '12px',
            padding: '12px',
            border: '1px solid #2d6a4f',
            maxHeight: '200px',
            overflowY: 'auto',
          }}>
            {[...history].reverse().map((h, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '8px 4px',
                fontSize: '13px',
                borderBottom: i < history.length - 1 ? '1px dashed #2d6a4f' : 'none',
              }}>
                <span style={{ color: '#ffd60a', fontFamily: 'monospace', fontWeight: 700 }}>{h.call}</span>
                <span style={{ color: '#b7e4c7' }}>{h.action}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ---------- クイズモード ----------
function QuizMode() {
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  // 初回マウント時に最初の問題を生成
  if (!question) {
    setQuestion(generateQuestion());
  }

  const handleAnswer = (choice) => {
    if (showResult) return;
    setSelected(choice);
    setShowResult(true);
    setTotalCount(t => t + 1);
    if (choice === question.correctIndex) {
      setCorrectCount(c => c + 1);
      setStreak(s => {
        const newStreak = s + 1;
        setBestStreak(b => Math.max(b, newStreak));
        return newStreak;
      });
    } else {
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    setQuestion(generateQuestion());
    setSelected(null);
    setShowResult(false);
  };

  const resetQuiz = () => {
    setQuestion(generateQuestion());
    setSelected(null);
    setShowResult(false);
    setCorrectCount(0);
    setTotalCount(0);
    setStreak(0);
    setBestStreak(0);
  };

  if (!question) return null;

  const accuracy = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;

  return (
    <div>
      <p style={{ fontSize: '13px', color: '#b7e4c7', lineHeight: 1.6, marginBottom: '16px' }}>
        次のコールは何? 4択から選んで、スコアコールを完璧に覚えよう。
      </p>

      {/* 成績表示 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '8px',
        marginBottom: '16px',
      }}>
        <QuizStatCard label="正答率" value={`${accuracy}%`} sub={`${correctCount}/${totalCount}`} color="#4caf50" />
        <QuizStatCard label="連続正解" value={streak} sub="ストリーク" color="#ffd60a" />
        <QuizStatCard label="最高記録" value={bestStreak} sub="連続" color="#ff6b35" />
      </div>

      {/* 問題表示 */}
      <div style={{
        background: 'linear-gradient(135deg, #1a4d2e 0%, #143d24 100%)',
        borderRadius: '16px',
        padding: '18px',
        marginBottom: '16px',
        border: '2px solid #ffd60a',
      }}>
        <div style={{
          fontSize: '10px',
          letterSpacing: '2px',
          color: '#ffd60a',
          fontWeight: 800,
          marginBottom: '8px',
        }}>
          📋 現在のコール
        </div>
        <div style={{
          fontSize: '36px',
          fontWeight: 900,
          color: '#fff',
          fontFamily: "'Courier New', monospace",
          textAlign: 'center',
          marginBottom: '12px',
          letterSpacing: '-1px',
        }}>
          {question.currentCall}
        </div>
        <div style={{
          background: '#0a1f14',
          borderRadius: '10px',
          padding: '12px',
          borderLeft: `3px solid ${question.scenarioColor}`,
        }}>
          <div style={{
            fontSize: '10px',
            letterSpacing: '1px',
            color: question.scenarioColor,
            fontWeight: 800,
            marginBottom: '4px',
          }}>
            次に起きたこと
          </div>
          <div style={{ fontSize: '14px', color: '#e8f5e9', lineHeight: 1.5, fontWeight: 700 }}>
            {question.scenarioText}
          </div>
        </div>
      </div>

      {/* 選択肢 */}
      <div style={{
        fontSize: '12px',
        color: '#ffd60a',
        fontWeight: 800,
        marginBottom: '8px',
        letterSpacing: '1px',
      }}>
        ❓ 次のコールは？
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
        {question.choices.map((choice, i) => {
          const isSelected = selected === i;
          const isCorrect = i === question.correctIndex;
          let bg = '#143d24';
          let border = '1px solid #2d6a4f';
          let color = '#fff';

          if (showResult) {
            if (isCorrect) {
              bg = 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)';
              border = '2px solid #4caf50';
            } else if (isSelected) {
              bg = 'linear-gradient(135deg, #c62828 0%, #8e0000 100%)';
              border = '2px solid #ff6b35';
            } else {
              color = '#6b7c6f';
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              disabled={showResult}
              style={{
                padding: '14px',
                background: bg,
                border: border,
                borderRadius: '12px',
                color: color,
                fontSize: '18px',
                fontWeight: 800,
                cursor: showResult ? 'default' : 'pointer',
                fontFamily: "'Courier New', monospace",
                textAlign: 'left',
                letterSpacing: '-0.5px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'all 0.2s',
              }}
            >
              <span style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: showResult && isCorrect ? '#4caf50' : showResult && isSelected ? '#ff6b35' : '#0a1f14',
                color: showResult && (isCorrect || isSelected) ? '#fff' : '#ffd60a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '13px',
                fontFamily: 'inherit',
                flexShrink: 0,
              }}>
                {showResult && isCorrect ? '✓' : showResult && isSelected ? '✗' : String.fromCharCode(65 + i)}
              </span>
              {choice}
            </button>
          );
        })}
      </div>

      {/* 結果表示 */}
      {showResult && (
        <div style={{
          background: selected === question.correctIndex
            ? 'linear-gradient(135deg, #1a4d2e 0%, #143d24 100%)'
            : 'linear-gradient(135deg, #3d1a14 0%, #2d0f0a 100%)',
          borderRadius: '14px',
          padding: '14px',
          marginBottom: '14px',
          border: `2px solid ${selected === question.correctIndex ? '#4caf50' : '#ff6b35'}`,
        }}>
          <div style={{
            fontSize: '16px',
            fontWeight: 900,
            color: selected === question.correctIndex ? '#4caf50' : '#ff6b35',
            marginBottom: '6px',
          }}>
            {selected === question.correctIndex ? '🎉 正解！' : '❌ 不正解'}
          </div>
          <div style={{ fontSize: '13px', color: '#e8f5e9', lineHeight: 1.6 }}>
            {question.explanation}
          </div>
        </div>
      )}

      {/* 次へ/リセットボタン */}
      {showResult ? (
        <button
          onClick={nextQuestion}
          style={{
            width: '100%',
            padding: '16px',
            background: 'linear-gradient(135deg, #ffd60a 0%, #f9a825 100%)',
            border: 'none',
            borderRadius: '14px',
            color: '#0a1f14',
            fontSize: '15px',
            fontWeight: 900,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          次の問題へ →
        </button>
      ) : null}

      {totalCount > 0 && (
        <button
          onClick={resetQuiz}
          style={{
            width: '100%',
            padding: '10px',
            background: 'transparent',
            border: '1px solid #2d6a4f',
            color: '#b7e4c7',
            borderRadius: '10px',
            fontSize: '12px',
            cursor: 'pointer',
            marginTop: '10px',
            fontFamily: 'inherit',
          }}
        >
          🔄 成績をリセット
        </button>
      )}
    </div>
  );
}

function QuizStatCard({ label, value, sub, color }) {
  return (
    <div style={{
      background: '#143d24',
      borderRadius: '10px',
      padding: '10px 6px',
      border: '1px solid #2d6a4f',
      textAlign: 'center',
    }}>
      <div style={{ fontSize: '9px', letterSpacing: '1px', color: '#b7e4c7', fontWeight: 700, marginBottom: '2px' }}>
        {label}
      </div>
      <div style={{ fontSize: '20px', fontWeight: 900, color: color, fontFamily: "'Courier New', monospace" }}>
        {value}
      </div>
      <div style={{ fontSize: '9px', color: '#6b7c6f', marginTop: '2px' }}>
        {sub}
      </div>
    </div>
  );
}

// クイズ問題生成ロジック
function generateQuestion() {
  // ランダムに現在のスコア状態を生成
  const myScore = Math.floor(Math.random() * 10);
  const oppScore = Math.floor(Math.random() * 10);
  const server = Math.random() < 0.5 ? 1 : 2;
  const isMyServe = Math.random() < 0.5;

  // シナリオタイプをランダム選択（自分サーブ時とレシーブ時で選択肢を変える）
  let scenarioType;
  if (isMyServe) {
    // 自分サーブ: 得点 / サーバー1→2 / サーバー2→サイドアウト
    const r = Math.random();
    if (r < 0.4) scenarioType = 'my_point';
    else if (r < 0.7 && server === 1) scenarioType = 'my_s1_fault';
    else scenarioType = 'my_s2_fault';
  } else {
    // 相手サーブ: 相手得点 / 相手S1フォルト / 相手S2フォルト
    const r = Math.random();
    if (r < 0.4) scenarioType = 'opp_point';
    else if (r < 0.7 && server === 1) scenarioType = 'opp_s1_fault';
    else scenarioType = 'opp_s2_fault';
  }

  // 現在のコール
  const currentCall = isMyServe
    ? `${myScore} - ${oppScore} - ${server}`
    : `${oppScore} - ${myScore} - ${server}`;

  // シナリオ別に次の状態を計算
  let nextMyScore = myScore;
  let nextOppScore = oppScore;
  let nextServer = server;
  let nextIsMyServe = isMyServe;
  let scenarioText = '';
  let scenarioColor = '#ffd60a';
  let explanation = '';

  if (scenarioType === 'my_point') {
    nextMyScore = myScore + 1;
    scenarioText = '✅ あなたが得点！';
    scenarioColor = '#4caf50';
    explanation = `得点したので自分のスコアが${myScore}→${myScore + 1}に。同じサーバーが続投し、パートナーと位置を入れ替えて反対側からサーブ。サーバー番号は変わりません。`;
  } else if (scenarioType === 'my_s1_fault') {
    nextServer = 2;
    scenarioText = '❌ あなたがフォルト (サーバー1)';
    scenarioColor = '#2196f3';
    explanation = `サーバー1のフォルトなので、サーブ権がパートナー(サーバー2)に移動。スコアは変わらず、サーバー番号だけ1→2になります。まだ相手にサーブ権は渡りません。`;
  } else if (scenarioType === 'my_s2_fault') {
    nextIsMyServe = false;
    nextServer = 1;
    scenarioText = '❌ あなたがフォルト (サーバー2)';
    scenarioColor = '#ff6b35';
    explanation = `サーバー2のフォルトはサイドアウト。サーブ権が相手チームに移り、相手のサーバー1からスタート。コールの順番が入れ替わるので、${oppScore} - ${myScore} - 1になります。`;
  } else if (scenarioType === 'opp_point') {
    nextOppScore = oppScore + 1;
    scenarioText = '❌ 相手が得点';
    scenarioColor = '#ff6b35';
    explanation = `相手が得点したので相手のスコアが${oppScore}→${oppScore + 1}。サーブ権はそのまま相手に。サーバー番号も変わりません。`;
  } else if (scenarioType === 'opp_s1_fault') {
    nextServer = 2;
    scenarioText = '✅ 相手がフォルト (サーバー1)';
    scenarioColor = '#2196f3';
    explanation = `相手のサーバー1がフォルト。サーブ権は相手のパートナー(サーバー2)に移るだけ。スコアは変わらず、まだ自分にサーブ権は来ません。`;
  } else if (scenarioType === 'opp_s2_fault') {
    nextIsMyServe = true;
    nextServer = 1;
    scenarioText = '✅ 相手がフォルト (サーバー2) → サイドアウト!';
    scenarioColor = '#4caf50';
    explanation = `相手のサーバー2のフォルトでサイドアウト! サーブ権が自分たちに来ます。自分がサーバー1として、${myScore} - ${oppScore} - 1からスタート。`;
  }

  // 正解のコール
  const correctCall = nextIsMyServe
    ? `${nextMyScore} - ${nextOppScore} - ${nextServer}`
    : `${nextOppScore} - ${nextMyScore} - ${nextServer}`;

  // 紛らわしい間違い選択肢を3つ生成
  const wrongCalls = generateWrongChoices(
    correctCall,
    { myScore, oppScore, server, isMyServe, scenarioType }
  );

  // 4択をシャッフル
  const allChoices = [correctCall, ...wrongCalls];
  // フィッシャーイェーツシャッフル
  for (let i = allChoices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allChoices[i], allChoices[j]] = [allChoices[j], allChoices[i]];
  }

  const correctIndex = allChoices.indexOf(correctCall);

  return {
    currentCall,
    scenarioText,
    scenarioColor,
    choices: allChoices,
    correctIndex,
    explanation,
  };
}

// 紛らわしい選択肢を生成
function generateWrongChoices(correctCall, ctx) {
  const { myScore, oppScore, server, isMyServe, scenarioType } = ctx;
  const wrongs = new Set();

  // パターン1: スコアは変わったが位置が逆
  if (scenarioType === 'my_point') {
    wrongs.add(`${myScore} - ${oppScore} - ${server}`); // 得点しなかった版
    wrongs.add(`${myScore + 1} - ${oppScore} - ${server === 1 ? 2 : 1}`); // サーバー番号変えた版
    wrongs.add(`${oppScore} - ${myScore + 1} - ${server}`); // 相手視点にしてしまった
  } else if (scenarioType === 'my_s1_fault') {
    wrongs.add(`${myScore} - ${oppScore} - 1`); // サーバー変えなかった
    wrongs.add(`${oppScore} - ${myScore} - 1`); // 相手にサーブ権渡した
    wrongs.add(`${myScore + 1} - ${oppScore} - 2`); // 得点してしまった
  } else if (scenarioType === 'my_s2_fault') {
    wrongs.add(`${myScore} - ${oppScore} - 2`); // サーバー変えなかった
    wrongs.add(`${myScore} - ${oppScore} - 1`); // 自分サーブのままサーバー1に
    wrongs.add(`${oppScore} - ${myScore} - 2`); // サーバー番号がおかしい
  } else if (scenarioType === 'opp_point') {
    wrongs.add(`${oppScore} - ${myScore} - ${server}`); // 相手得点なし
    wrongs.add(`${oppScore + 1} - ${myScore} - ${server === 1 ? 2 : 1}`); // サーバー番号変わった
    wrongs.add(`${myScore} - ${oppScore + 1} - ${server}`); // 自分視点にしちゃった
  } else if (scenarioType === 'opp_s1_fault') {
    wrongs.add(`${oppScore} - ${myScore} - 1`); // サーバー変わってない
    wrongs.add(`${myScore} - ${oppScore} - 1`); // 自分のサーブになった
    wrongs.add(`${oppScore + 1} - ${myScore} - 2`); // 相手が得点になった
  } else if (scenarioType === 'opp_s2_fault') {
    wrongs.add(`${myScore} - ${oppScore} - 2`); // サーバー1じゃなくて2
    wrongs.add(`${oppScore} - ${myScore} - 1`); // 相手サーブのまま
    wrongs.add(`${myScore + 1} - ${oppScore} - 1`); // 得点しちゃった
  }

  // 重複&正解と被りを除く
  const filtered = Array.from(wrongs).filter(w => w !== correctCall);

  // 3つ揃うまでランダム生成
  while (filtered.length < 3) {
    const rm = Math.floor(Math.random() * 12);
    const ro = Math.floor(Math.random() * 12);
    const rs = Math.random() < 0.5 ? 1 : 2;
    const candidate = `${rm} - ${ro} - ${rs}`;
    if (candidate !== correctCall && !filtered.includes(candidate)) {
      filtered.push(candidate);
    }
  }

  return filtered.slice(0, 3);
}

function resultBtnStyle(color, isLocked) {
  return {
    padding: '16px 14px',
    background: isLocked
      ? '#2d6a4f'
      : `linear-gradient(135deg, ${color} 0%, ${darkerColor(color)} 100%)`,
    border: 'none',
    color: '#fff',
    borderRadius: '14px',
    fontSize: '14px',
    fontWeight: 800,
    cursor: isLocked ? 'not-allowed' : 'pointer',
    fontFamily: 'inherit',
    width: '100%',
    opacity: isLocked ? 0.5 : 1,
    boxShadow: isLocked ? 'none' : `0 3px 10px ${color}33`,
  };
}

function darkerColor(color) {
  // 主要色の濃い版を返す(グラデーション用)
  const map = {
    '#4caf50': '#2e7d32',
    '#ff6b35': '#d84315',
  };
  return map[color] || color;
}

// ==================== 乱数表（ダブルスペア決め） ====================
function RandomTab() {
  const [numPlayers, setNumPlayers] = useState(8);
  const [numCourts, setNumCourts] = useState(2);
  const [playerNames, setPlayerNames] = useState(
    Array.from({ length: 8 }, (_, i) => `P${i + 1}`)
  );
  const [rounds, setRounds] = useState([]);
  const [numRounds, setNumRounds] = useState(7);
  const [showNameEdit, setShowNameEdit] = useState(false);

  // 人数変更時に名前リストを調整
  const handleNumChange = (n) => {
    setNumPlayers(n);
    setPlayerNames((prev) => {
      const arr = [...prev];
      while (arr.length < n) arr.push(`P${arr.length + 1}`);
      return arr.slice(0, n);
    });
    // コート数が最大可能数を超えていたら調整
    const maxCourts = Math.floor(n / 4);
    if (numCourts > maxCourts) {
      setNumCourts(Math.max(1, maxCourts));
    }
    setRounds([]);
  };

  const updateName = (i, name) => {
    setPlayerNames((prev) => {
      const arr = [...prev];
      arr[i] = name;
      return arr;
    });
  };

  // ペア組み合わせ生成（なるべく同じ人と組まない・対戦しないようにスコアリング）
  const generateRounds = () => {
    const players = Array.from({ length: numPlayers }, (_, i) => i);
    const pairCount = {}; // "i-j" -> 何回組んだか
    const opponentCount = {}; // "i-j" -> 何回対戦したか
    const playCount = Array(numPlayers).fill(0); // 各人の試合数
    const pairKey = (a, b) => `${Math.min(a, b)}-${Math.max(a, b)}`;

    const result = [];

    for (let r = 0; r < numRounds; r++) {
      // 試合数が少ない人を優先
      const sorted = [...players].sort((a, b) => playCount[a] - playCount[b]);
      // ユーザー指定のコート数を使う（人数不足なら自動で最大可能数に制限）
      const courtsPerRound = Math.min(numCourts, Math.floor(numPlayers / 4));
      const playersThisRound = courtsPerRound * 4;
      // 休む人を決定（playCount多い人から）
      const resting = sorted.slice(playersThisRound).sort((a, b) => a - b);
      const playing = sorted.slice(0, playersThisRound);

      // ランダム性を入れつつ、なるべく被らない組み合わせを探す
      let bestMatches = null;
      let bestScore = Infinity;

      for (let attempt = 0; attempt < 200; attempt++) {
        const shuffled = [...playing].sort(() => Math.random() - 0.5);
        const matches = [];
        let score = 0;

        for (let c = 0; c < courtsPerRound; c++) {
          const four = shuffled.slice(c * 4, c * 4 + 4);
          // 4人を2ペアに分ける組み合わせは3通り: (0,1)vs(2,3), (0,2)vs(1,3), (0,3)vs(1,2)
          const configs = [
            [[four[0], four[1]], [four[2], four[3]]],
            [[four[0], four[2]], [four[1], four[3]]],
            [[four[0], four[3]], [four[1], four[2]]],
          ];
          let bestConfig = configs[0];
          let bestConfigScore = Infinity;
          for (const cfg of configs) {
            const [p1, p2] = cfg;
            const s =
              (pairCount[pairKey(p1[0], p1[1])] || 0) * 10 +
              (pairCount[pairKey(p2[0], p2[1])] || 0) * 10 +
              (opponentCount[pairKey(p1[0], p2[0])] || 0) +
              (opponentCount[pairKey(p1[0], p2[1])] || 0) +
              (opponentCount[pairKey(p1[1], p2[0])] || 0) +
              (opponentCount[pairKey(p1[1], p2[1])] || 0);
            if (s < bestConfigScore) {
              bestConfigScore = s;
              bestConfig = cfg;
            }
          }
          matches.push(bestConfig);
          score += bestConfigScore;
        }

        if (score < bestScore) {
          bestScore = score;
          bestMatches = matches;
        }
        if (score === 0) break; // 完璧なら抜ける
      }

      // 集計を更新
      bestMatches.forEach(([p1, p2]) => {
        pairCount[pairKey(p1[0], p1[1])] = (pairCount[pairKey(p1[0], p1[1])] || 0) + 1;
        pairCount[pairKey(p2[0], p2[1])] = (pairCount[pairKey(p2[0], p2[1])] || 0) + 1;
        for (const a of p1) for (const b of p2) {
          opponentCount[pairKey(a, b)] = (opponentCount[pairKey(a, b)] || 0) + 1;
        }
        [...p1, ...p2].forEach(p => playCount[p]++);
      });

      result.push({ round: r + 1, matches: bestMatches, resting });
    }

    setRounds(result);
  };

  // 各プレイヤーの試合数集計
  const gameCount = Array(numPlayers).fill(0);
  rounds.forEach(r => {
    r.matches.forEach(([p1, p2]) => {
      [...p1, ...p2].forEach(p => gameCount[p]++);
    });
  });

  return (
    <div>
      <SectionTitle>ダブルス ペア決め乱数表</SectionTitle>
      <p style={{ fontSize: '13px', color: '#b7e4c7', lineHeight: 1.6, marginBottom: '16px' }}>
        人数とラウンド数を指定すると、なるべく同じ人と被らないペア表を自動生成します。
      </p>

      {/* 人数選択 */}
      <div style={{
        background: '#143d24',
        borderRadius: '14px',
        padding: '16px',
        border: '1px solid #2d6a4f',
        marginBottom: '14px',
      }}>
        <div style={{ fontSize: '13px', color: '#b7e4c7', fontWeight: 700, marginBottom: '10px' }}>
          参加人数
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {[4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(n => (
            <button
              key={n}
              onClick={() => handleNumChange(n)}
              style={{
                padding: '8px 12px',
                background: numPlayers === n ? '#ffd60a' : 'transparent',
                color: numPlayers === n ? '#0a1f14' : '#b7e4c7',
                border: numPlayers === n ? 'none' : '1px solid #2d6a4f',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 800,
                cursor: 'pointer',
                fontFamily: 'inherit',
                minWidth: '40px',
              }}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* コート数 */}
      <div style={{
        background: '#143d24',
        borderRadius: '14px',
        padding: '16px',
        border: '1px solid #2d6a4f',
        marginBottom: '14px',
      }}>
        <div style={{ fontSize: '13px', color: '#b7e4c7', fontWeight: 700, marginBottom: '10px' }}>
          使えるコート面数
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {[1, 2, 3, 4, 5, 6].map(n => {
            const maxCourts = Math.floor(numPlayers / 4);
            const disabled = n > maxCourts;
            return (
              <button
                key={n}
                onClick={() => !disabled && setNumCourts(n)}
                disabled={disabled}
                style={{
                  padding: '8px 14px',
                  background: numCourts === n ? '#ffd60a' : 'transparent',
                  color: disabled ? '#3d5a4a' : (numCourts === n ? '#0a1f14' : '#b7e4c7'),
                  border: numCourts === n ? 'none' : '1px solid #2d6a4f',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: disabled ? 'not-allowed' : 'pointer',
                  fontFamily: 'inherit',
                  minWidth: '50px',
                  opacity: disabled ? 0.4 : 1,
                }}
              >
                {n}面
              </button>
            );
          })}
        </div>
        {(() => {
          const activeCourts = Math.min(numCourts, Math.floor(numPlayers / 4));
          const playing = activeCourts * 4;
          const resting = numPlayers - playing;
          return (
            <div style={{
              marginTop: '10px', padding: '8px 10px',
              background: '#0a1f14', borderRadius: '8px',
              fontSize: '11px', color: '#b7e4c7', lineHeight: 1.6,
            }}>
              💡 毎ラウンド <strong style={{ color: '#ffd60a' }}>{playing}人</strong> がプレイ
              {resting > 0 && <>、 <strong style={{ color: '#ff6b35' }}>{resting}人</strong> が休憩</>}
              {numCourts > Math.floor(numPlayers / 4) && (
                <div style={{ color: '#ff6b35', marginTop: '4px' }}>
                  ⚠️ 人数が足りないため、実際は {activeCourts}面で実施します
                </div>
              )}
            </div>
          );
        })()}
      </div>

      {/* ラウンド数 */}
      <div style={{
        background: '#143d24',
        borderRadius: '14px',
        padding: '16px',
        border: '1px solid #2d6a4f',
        marginBottom: '14px',
      }}>
        <div style={{ fontSize: '13px', color: '#b7e4c7', fontWeight: 700, marginBottom: '10px' }}>
          ラウンド数: <span style={{ color: '#ffd60a', fontSize: '18px', fontWeight: 900 }}>{numRounds}</span>
        </div>
        <input
          type="range"
          min="1"
          max="20"
          value={numRounds}
          onChange={(e) => setNumRounds(Number(e.target.value))}
          style={{ width: '100%', accentColor: '#ffd60a' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#b7e4c7', marginTop: '4px' }}>
          <span>1</span><span>10</span><span>20</span>
        </div>
      </div>

      {/* 名前編集 */}
      <div style={{ marginBottom: '14px' }}>
        <button
          onClick={() => setShowNameEdit(!showNameEdit)}
          style={{
            width: '100%',
            padding: '12px',
            background: 'transparent',
            border: '1px solid #2d6a4f',
            color: '#b7e4c7',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          {showNameEdit ? '▲ 名前編集を閉じる' : '▼ 名前を編集する（任意）'}
        </button>
        {showNameEdit && (
          <div style={{
            marginTop: '10px',
            background: '#143d24',
            borderRadius: '12px',
            padding: '12px',
            border: '1px solid #2d6a4f',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
          }}>
            {playerNames.map((name, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{
                  width: '24px', height: '24px', borderRadius: '50%',
                  background: '#ffd60a', color: '#0a1f14',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '11px', fontWeight: 900, flexShrink: 0,
                }}>{i + 1}</div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => updateName(i, e.target.value)}
                  style={{
                    flex: 1,
                    padding: '6px 8px',
                    background: '#0a1f14',
                    border: '1px solid #2d6a4f',
                    borderRadius: '6px',
                    color: '#fff',
                    fontSize: '13px',
                    fontFamily: 'inherit',
                    minWidth: 0,
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 生成ボタン */}
      <button
        onClick={generateRounds}
        style={{
          width: '100%',
          padding: '16px',
          background: 'linear-gradient(135deg, #ffd60a 0%, #f9a825 100%)',
          border: 'none',
          color: '#0a1f14',
          borderRadius: '12px',
          fontSize: '16px',
          fontWeight: 900,
          cursor: 'pointer',
          fontFamily: 'inherit',
          marginBottom: '20px',
          letterSpacing: '1px',
        }}
      >
        🎲 乱数表を生成する
      </button>

      {/* 結果表示 */}
      {rounds.length > 0 && (
        <>
          <SectionTitle>対戦表</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            {rounds.map((r) => (
              <div key={r.round} style={{
                background: 'linear-gradient(135deg, #1a4d2e 0%, #143d24 100%)',
                borderRadius: '14px',
                padding: '14px',
                borderLeft: '4px solid #ffd60a',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '10px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #2d6a4f',
                }}>
                  <div style={{
                    background: '#ffd60a',
                    color: '#0a1f14',
                    borderRadius: '6px',
                    padding: '3px 10px',
                    fontSize: '12px',
                    fontWeight: 900,
                  }}>
                    R{r.round}
                  </div>
                  <div style={{ fontSize: '13px', color: '#b7e4c7', fontWeight: 700 }}>
                    ラウンド {r.round}
                  </div>
                </div>
                {r.matches.map((m, i) => (
                  <MatchRow
                    key={i}
                    courtNum={i + 1}
                    team1={m[0].map(p => playerNames[p])}
                    team2={m[1].map(p => playerNames[p])}
                  />
                ))}
                {r.resting.length > 0 && (
                  <div style={{
                    marginTop: '8px',
                    padding: '8px 10px',
                    background: '#0a1f14',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#b7e4c7',
                  }}>
                    💤 休憩: {r.resting.map(p => playerNames[p]).join('・')}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 試合数集計 */}
          <SectionTitle>試合数チェック</SectionTitle>
          <div style={{
            background: '#143d24',
            borderRadius: '14px',
            padding: '14px',
            border: '1px solid #2d6a4f',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
            gap: '8px',
          }}>
            {playerNames.map((name, i) => (
              <div key={i} style={{
                background: '#0a1f14',
                borderRadius: '8px',
                padding: '8px 6px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '11px', color: '#b7e4c7', marginBottom: '2px' }}>
                  {name}
                </div>
                <div style={{ fontSize: '18px', color: '#ffd60a', fontWeight: 900 }}>
                  {gameCount[i]}
                </div>
                <div style={{ fontSize: '9px', color: '#b7e4c7' }}>試合</div>
              </div>
            ))}
          </div>
        </>
      )}

      {rounds.length === 0 && (
        <div style={{
          background: '#143d24',
          borderRadius: '14px',
          padding: '24px 16px',
          border: '1px dashed #2d6a4f',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '40px', marginBottom: '8px' }}>🎲</div>
          <p style={{ margin: 0, fontSize: '13px', color: '#b7e4c7', lineHeight: 1.6 }}>
            人数とラウンド数を決めて<br/>
            「乱数表を生成する」ボタンを押してください
          </p>
        </div>
      )}
    </div>
  );
}

function MatchRow({ courtNum, team1, team2 }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 0',
      fontSize: '13px',
    }}>
      <div style={{
        background: '#0a1f14',
        color: '#ffd60a',
        borderRadius: '6px',
        padding: '3px 7px',
        fontSize: '10px',
        fontWeight: 900,
        flexShrink: 0,
        border: '1px solid #2d6a4f',
      }}>
        C{courtNum}
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
        <div style={{
          flex: 1,
          background: '#0a1f14',
          padding: '6px 8px',
          borderRadius: '6px',
          color: '#e8f5e9',
          fontWeight: 700,
          fontSize: '12px',
          textAlign: 'center',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {team1.join(' · ')}
        </div>
        <div style={{ color: '#ff6b35', fontWeight: 900, fontSize: '11px' }}>VS</div>
        <div style={{
          flex: 1,
          background: '#0a1f14',
          padding: '6px 8px',
          borderRadius: '6px',
          color: '#e8f5e9',
          fontWeight: 700,
          fontSize: '12px',
          textAlign: 'center',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {team2.join(' · ')}
        </div>
      </div>
    </div>
  );
}

// ==================== ルール改定履歴 ====================
function UpdatesTab() {
  const [expandedYear, setExpandedYear] = useState(2026);

  const yearlyUpdates = [
    {
      year: 2026,
      effectiveDate: '2026年1月1日',
      summary: 'ルールブック大幅再構成。114項目の変更を新構造に再編。',
      changes: [
        {
          level: 'major',
          title: 'ラリースコアリングの「フリーズ」解消',
          desc: 'ラリースコアリング形式で、サーブ側だけでなくレシーブ側も試合を終わらせる得点ができるようになった。マッチポイントで止まる現象が解消。',
        },
        {
          level: 'major',
          title: 'バレーサーブに「明確に（clearly）」の文言追加',
          desc: 'サーブの3条件（①腰より下で打つ ②パドルヘッドが手首より下 ③上向きの弧）すべてに「clearly（明確に）」が追加。あいまいな動きはフォルト扱いに。',
        },
        {
          level: 'major',
          title: 'アダプティブ立位部門の正式化',
          desc: '身体に障害がある立位プレイヤー向けの部門を新設。該当プレイヤーは2バウンドOK（セカンドバウンスはコート内どこでも可）。',
        },
        {
          level: 'medium',
          title: '観客への相談禁止が義務化',
          desc: '「should not（すべきでない）」から「must not（してはならない）」へ。ライン判定で観客に聞くと警告またはペナルティ。',
        },
        {
          level: 'medium',
          title: '余分なボール所持がフォルトに',
          desc: 'ラリー中にポケットの予備ボールが相手から見えたり、コートに落ちたりするとフォルト。',
        },
        {
          level: 'medium',
          title: 'ネットポストのルール明確化',
          desc: 'ボールがネットを越えて相手コートにバウンドした後、スピンや風でネットポストに当たっても自動フォルトではなくなった。',
        },
        {
          level: 'medium',
          title: 'アウトコールは即座に',
          desc: 'パートナーが返球できるかを見てからアウトコールすると「イン」扱い。即座にコールしないとダメ。',
        },
        {
          level: 'medium',
          title: 'パートナー間の判定不一致は「イン」',
          desc: '「doubt（疑い）」から「conflict（不一致）」へ文言変更。ペアで意見が分かれたら「イン」判定。',
        },
        {
          level: 'minor',
          title: '試合前から審判権限',
          desc: 'ウォームアップや試合前ブリーフィング中でも、審判は警告やテクニカルファウルを出せる。',
        },
        {
          level: 'minor',
          title: 'タイムアウトの意思表示明確化',
          desc: 'タイムアウト要求は「Time-out」と言葉で、または「T」のハンドサインで明確に示す必要あり。',
        },
        {
          level: 'minor',
          title: 'パドル承認マークの義務化',
          desc: '大会で使うパドルは「USA Pickleball Approved」マーク必須。未承認パドル使用は試合没収。',
        },
      ],
    },
    {
      year: 2025,
      effectiveDate: '2025年1月1日',
      summary: 'キャッチ・キャリーの審判裁量廃止、10秒サーブルール継続。',
      changes: [
        {
          level: 'medium',
          title: 'キャッチ・キャリーの厳格化',
          desc: '意図的でなくてもパドル上でボールを一瞬でも保持したらフォルト。審判の裁量がなくなった。',
        },
        {
          level: 'medium',
          title: '10秒サーブルール',
          desc: 'スコアコール後10秒以内にサーブを打たないとフォルト。試合進行の遅延防止。',
        },
        {
          level: 'minor',
          title: 'サーブのスピン禁止明確化',
          desc: '手またはパドルで打つ前にボールにスピンをかけることは禁止。ただしパドル接触時のスピン生成はOK。',
        },
      ],
    },
    {
      year: 2024,
      effectiveDate: '2024年1月1日',
      summary: 'ドロップサーブ恒久化、パドル素材規定の強化。',
      changes: [
        {
          level: 'major',
          title: 'ドロップサーブが恒久ルール化',
          desc: '暫定ルールだったドロップサーブ（ボールを落としてバウンド後に打つ）が正式採用。高さ制限なし、手からリリースするだけでOK。',
        },
        {
          level: 'medium',
          title: 'パドル表面のテスト規定強化',
          desc: 'パドル表面の摩擦係数テストが厳格化。スピン過多を生み出す改造パドルの排除。',
        },
      ],
    },
    {
      year: 2023,
      effectiveDate: '2023年1月1日',
      summary: 'ドロップサーブ試行継続、サーバーのコールタイミング明確化。',
      changes: [
        {
          level: 'medium',
          title: 'スコアコールのタイミング',
          desc: 'サーブ前にスコアをコールし終える必要あり。コール中にサーブするとフォルト。',
        },
      ],
    },
    {
      year: 2021,
      effectiveDate: '2021年1月1日',
      summary: 'レットサーブ廃止、ドロップサーブ暫定導入。',
      changes: [
        {
          level: 'major',
          title: 'レットサーブの廃止',
          desc: 'サーブでネットに触れてもサービスコート内に入ればインプレー。打ち直しはなし（2021年〜現行）。',
        },
        {
          level: 'major',
          title: 'ドロップサーブの暫定導入',
          desc: 'ボールを手から落としてワンバウンド後に打つサーブ方式が試験導入された（後に2024年恒久化）。',
        },
      ],
    },
  ];

  return (
    <div>
      <SectionTitle>ルール改定履歴</SectionTitle>
      <p style={{ fontSize: '13px', color: '#b7e4c7', lineHeight: 1.6, marginBottom: '16px' }}>
        ピックルボールは毎年1月1日に改定。USA Pickleball 公式ルールブックに基づく主要変更点をまとめています。
      </p>

      <div style={{
        background: 'linear-gradient(135deg, #ffd60a 0%, #f9a825 100%)',
        borderRadius: '14px',
        padding: '14px',
        marginBottom: '16px',
      }}>
        <div style={{ fontSize: '11px', color: '#0a1f14', fontWeight: 800, letterSpacing: '1px', marginBottom: '4px' }}>
          📢 2026年版のポイント
        </div>
        <div style={{ fontSize: '14px', color: '#0a1f14', fontWeight: 700, lineHeight: 1.5 }}>
          ルールブック全体が再構成されました。ラリースコアリングのフリーズ解消、サーブ要件の厳格化、アダプティブ部門の正式化が目玉。
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {yearlyUpdates.map((y) => (
          <div key={y.year} style={{
            background: '#143d24',
            borderRadius: '14px',
            border: '1px solid #2d6a4f',
            overflow: 'hidden',
          }}>
            <button
              onClick={() => setExpandedYear(expandedYear === y.year ? null : y.year)}
              style={{
                width: '100%',
                padding: '14px 16px',
                background: expandedYear === y.year ? '#1a4d2e' : 'transparent',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                fontFamily: 'inherit',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div style={{
                background: '#ffd60a',
                color: '#0a1f14',
                borderRadius: '8px',
                padding: '4px 10px',
                fontSize: '16px',
                fontWeight: 900,
                flexShrink: 0,
              }}>
                {y.year}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '12px', color: '#b7e4c7', marginBottom: '2px' }}>
                  施行: {y.effectiveDate}
                </div>
                <div style={{ fontSize: '13px', color: '#e8f5e9', lineHeight: 1.4 }}>
                  {y.summary}
                </div>
              </div>
              <div style={{
                color: '#ffd60a',
                fontSize: '16px',
                flexShrink: 0,
                transform: expandedYear === y.year ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s',
              }}>
                ▼
              </div>
            </button>

            {expandedYear === y.year && (
              <div style={{ padding: '4px 12px 14px' }}>
                {y.changes.map((c, i) => (
                  <ChangeCard key={i} level={c.level} title={c.title} desc={c.desc} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '20px',
        background: '#143d24',
        borderRadius: '14px',
        padding: '14px',
        border: '1px dashed #2d6a4f',
      }}>
        <div style={{ fontSize: '12px', color: '#b7e4c7', lineHeight: 1.7 }}>
          📖 <strong style={{ color: '#ffd60a' }}>最新ルール公式ソース:</strong><br/>
          USA Pickleball 公式サイト (usapickleball.org) にて、毎年12月中旬に翌年分のルールブックとChange Documentが公開されます。
        </div>
      </div>
    </div>
  );
}

function ChangeCard({ level, title, desc }) {
  const levelConfig = {
    major: { label: '重要', color: '#ff6b35', bg: 'rgba(255, 107, 53, 0.15)' },
    medium: { label: '通常', color: '#ffd60a', bg: 'rgba(255, 214, 10, 0.12)' },
    minor: { label: '軽微', color: '#4caf50', bg: 'rgba(76, 175, 80, 0.12)' },
  };
  const cfg = levelConfig[level];

  return (
    <div style={{
      background: cfg.bg,
      borderLeft: `3px solid ${cfg.color}`,
      borderRadius: '8px',
      padding: '12px',
      marginTop: '8px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
        <div style={{
          background: cfg.color,
          color: '#0a1f14',
          borderRadius: '4px',
          padding: '2px 6px',
          fontSize: '10px',
          fontWeight: 900,
          letterSpacing: '1px',
        }}>
          {cfg.label}
        </div>
        <div style={{ fontSize: '14px', color: '#fff', fontWeight: 800, flex: 1, lineHeight: 1.3 }}>
          {title}
        </div>
      </div>
      <p style={{
        margin: 0,
        fontSize: '12px',
        color: '#e8f5e9',
        lineHeight: 1.6,
        paddingLeft: '2px',
      }}>
        {desc}
      </p>
    </div>
  );
}

// ==================== ルール辞典（Q&A検索） ====================
function AIRefereeTab({ isPremium, openPaywall }) {
  const FREE_ITEM_LIMIT = 20;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'すべて', icon: '📚' },
    { id: 'serve', label: 'サーブ', icon: '🏓' },
    { id: 'kitchen', label: 'キッチン', icon: '🚫' },
    { id: 'score', label: 'スコア', icon: '🔢' },
    { id: 'line', label: 'ライン判定', icon: '📏' },
    { id: 'match', label: '試合進行', icon: '⏱️' },
    { id: 'rally', label: 'ラリー中', icon: '💥' },
  ];

  const rules = [
    // ===== サーブ =====
    { cat: 'serve', q: 'サーブがネットに触れてキッチン外のコートに入った', verdict: 'ok',
      a: 'インプレー。2021年レット廃止後、ネットに触れても「キッチン外のサービスコート」に入れば有効。ラリー続行。',
      keywords: ['レット', 'ネット', 'サーブ', '触れる', 'let'] },
    { cat: 'serve', q: 'サーブがキッチンまたはキッチンラインに落ちた', verdict: 'ng',
      a: 'フォルト（ショート）。サーブ時のみキッチンは「アウト」扱い。ラインを踏んでもフォルト。ラリー中のボールはキッチンOKだが、サーブだけ別扱い。',
      keywords: ['サーブ', 'キッチン', 'ショート', 'ライン'] },
    { cat: 'serve', q: 'サーブを打つ前にスピンをかけていい？', verdict: 'ng',
      a: '手でボールを回してからサーブはフォルト。ただしパドルで打つ瞬間にスピンがかかるのはOK。2026年ルールでも明確に禁止。',
      keywords: ['スピン', 'サーブ', '回転'] },
    { cat: 'serve', q: 'サーブで腰より上にラケットが来た', verdict: 'ng',
      a: 'フォルト。バレーサーブは①ボール接触が腰より下、②パドルヘッドが手首より下、③上向きの弧、の3条件が必須。2026年から「明確に（clearly）」満たす必要あり。',
      keywords: ['腰', 'サーブ', '高さ', '手首'] },
    { cat: 'serve', q: 'ドロップサーブは今も使える？', verdict: 'ok',
      a: '使える。ボールを手から落としてワンバウンド後に打つ方式。2024年から正式ルール化。高さ制限なし、リリース方法に制限なし。',
      keywords: ['ドロップ', 'サーブ', 'バウンド'] },
    { cat: 'serve', q: 'サーブを打つとき足がラインを踏んだ', verdict: 'ng',
      a: 'フットフォルト。サーブ時、ベースラインを踏んだり越えたりするとフォルト。少なくとも片足はベースライン後方の地面に接地、両足ともセンター・サイドライン延長線の内側にある必要あり。',
      keywords: ['フット', 'ライン', '踏む', 'サーブ'] },
    { cat: 'serve', q: 'スコアコールを忘れてサーブしたら？', verdict: 'ng',
      a: 'フォルト。サーブ前にスコア（自分-相手-サーバー番号）を完全にコールする必要あり。コール途中のサーブもフォルト。',
      keywords: ['コール', 'スコア', 'サーブ', '忘れる'] },
    { cat: 'serve', q: '10秒以内にサーブしないとどうなる？', verdict: 'ng',
      a: 'フォルト。スコアコール後10秒以内にサーブしないと遅延でフォルト。試合進行を守るためのルール。',
      keywords: ['10秒', '時間', 'サーブ', '遅延'] },
    { cat: 'serve', q: 'サーブが対角線じゃないコートに入った', verdict: 'ng',
      a: 'フォルト。サーブは必ず対角線上のサービスコートに入れる。同じ側に入れたらフォルト。',
      keywords: ['対角', 'サービス', 'コート', 'サーブ'] },
    { cat: 'serve', q: 'サーブは1回だけ？2回チャンスある？', verdict: 'ok',
      a: 'サーブは1回のみ。テニスのようなセカンドサーブはない。ミスしたら即フォルト（サーブ権移動または相手の得点）。',
      keywords: ['1回', '2回', 'セカンド', 'サーブ'] },
    { cat: 'serve', q: 'シングルスのスコアコールは？', verdict: 'ok',
      a: '「自分-相手」の2つだけ。サーバー番号なし。偶数なら右、奇数なら左からサーブ。例: 「5-3」。',
      keywords: ['シングル', 'スコア', 'コール', '単', '2つ'] },

    // ===== キッチン =====
    { cat: 'kitchen', q: 'キッチンに踏み込んでボレーした', verdict: 'ng',
      a: 'フォルト。キッチン（ネットから2.13m）内でのボレー禁止。ラインを踏むのもダメ。',
      keywords: ['キッチン', 'ボレー', '踏み込む', 'ノンボレー'] },
    { cat: 'kitchen', q: 'ボレーを打った後の勢いでキッチンに入った', verdict: 'ng',
      a: 'フォルト。打ち終わった後でも、勢い（モメンタム）でキッチンに入ったらフォルト。完全に止まるまで注意。',
      keywords: ['ボレー', '勢い', 'キッチン', 'モメンタム'] },
    { cat: 'kitchen', q: 'キッチン内でワンバウンドしたボールを打つのは？', verdict: 'ok',
      a: 'OK。キッチン内でもバウンド後なら打てる。打ったあとはすぐキッチンから出ればボレー準備に戻れる。',
      keywords: ['キッチン', 'バウンド', 'ワンバウンド'] },
    { cat: 'kitchen', q: 'キッチンの外でジャンプしてボレー、着地もキッチン外', verdict: 'ok',
      a: 'OK（エルネ）。ジャンプ中にキッチン上空を通ってもOK。着地がキッチン外なら合法。着地がキッチン内ならフォルト。',
      keywords: ['ジャンプ', 'ボレー', '空中', '着地', 'エルネ'] },
    { cat: 'kitchen', q: 'キッチンラインを踏んでボレーした', verdict: 'ng',
      a: 'フォルト。ラインもキッチン扱い。わずかでも踏んでいればフォルト。',
      keywords: ['ライン', '踏む', 'キッチン', 'ボレー'] },
    { cat: 'kitchen', q: 'パドルがキッチン上空を横切った（足は外）', verdict: 'ok',
      a: 'OK。パドルが空中でキッチン上空を通るだけならOK。足がキッチンに入らなければフォルトにならない。',
      keywords: ['パドル', '空中', 'キッチン', '横切る'] },
    { cat: 'kitchen', q: 'ボレー後、帽子やサングラスがキッチンに落ちた', verdict: 'ng',
      a: 'フォルト。身につけている物・持ち物がキッチンに触れてもフォルト扱い。服・帽子・サングラスもNG。',
      keywords: ['帽子', 'サングラス', '持ち物', 'キッチン', '服'] },
    { cat: 'kitchen', q: 'キッチン内に立ってリターン（非ボレー）はOK？', verdict: 'ok',
      a: 'OK。ボレーしない限り、キッチン内に立つこと自体は合法。バウンド後のボールならキッチン内でも打てる。',
      keywords: ['キッチン', '立つ', '非ボレー', 'リターン'] },
    { cat: 'kitchen', q: 'パートナーがキッチン上でボレー中、支えたら？', verdict: 'ng',
      a: 'フォルト。ペアの一方がキッチン違反なら、チーム全体のフォルト。パートナーを物理的に支えてキッチンに入ったらアウト。',
      keywords: ['パートナー', '支える', 'ペア', 'キッチン'] },

    // ===== スコア =====
    { cat: 'score', q: '11対10になったら試合終了？', verdict: 'conditional',
      a: '2点差ルール。通常11点先取だが、2点差つかないと勝利できない。11-10なら続行、12-10で勝利。',
      keywords: ['11', '10', '2点差', 'デュース', '勝利'] },
    { cat: 'score', q: '自分の点数が偶数のとき、どこからサーブ？', verdict: 'ok',
      a: '右側のコートから。偶数=右、奇数=左が基本ルール。得点するたびパートナーと位置を入れ替えるので自動的にそうなる。',
      keywords: ['偶数', '右', 'サーブ', '位置'] },
    { cat: 'score', q: 'ゲーム開始の最初のサーブは1番目？', verdict: 'ng',
      a: '先攻チームだけ「サーバー2」からスタート。先攻チームが有利にならないよう、いきなり2番目扱い。フォルトしたらすぐ相手にサーブ権。',
      keywords: ['開始', 'サーバー', '2', '最初'] },
    { cat: 'score', q: 'レシーブ側でも得点できる？', verdict: 'conditional',
      a: '通常スコアリングは不可（サーブ側のみ得点）。2026年からラリースコアリング形式では、レシーブ側もマッチポイント取れるようになった（フリーズ解消）。',
      keywords: ['レシーブ', '得点', 'ラリー', 'スコアリング'] },
    { cat: 'score', q: 'サーバー2がフォルトしたら？', verdict: 'ok',
      a: 'サイドアウト（サーブ権が相手チームに移る）。パートナーに交代せず、そのまま相手チームのサーバー1からスタート。',
      keywords: ['サーバー', '2', 'フォルト', 'サイドアウト'] },
    { cat: 'score', q: 'スコアを間違えてコールしたまま試合が進んだら？', verdict: 'conditional',
      a: '【重要】リターン前なら誰でも停止して訂正可能。リターン後はラリー完了まで続行し、次のサーブ前に訂正。ラリー途中で止めるとフォルト。止めた側がスコア訂正を間違えて指摘した場合もフォルト。',
      keywords: ['スコア', '間違い', '訂正', 'コール'] },

    // ===== ライン判定 =====
    { cat: 'line', q: 'ボールがラインに少しでも触れたら？', verdict: 'ok',
      a: 'イン。ボールの一部でもラインに触れれば「イン」扱い。ベースライン・サイドライン・センターラインすべて同じ（サーブ時のキッチンラインを除く）。',
      keywords: ['ライン', '触れる', 'イン', 'アウト'] },
    { cat: 'line', q: 'バウンド後に「アウト！」と叫んだが実はインだった', verdict: 'ng',
      a: 'こちらのフォルト、相手の得点。バウンド後のアウトコールは「ラインコール」扱いで、叫んだ瞬間にラリー終了。実際のボール位置は関係なし。誤コールは自分の損。',
      keywords: ['アウト', 'コール', 'バウンド', 'イン', '間違い'] },
    { cat: 'line', q: 'ボールが空中にある時に「アウト！」と叫んだ、実はインだった', verdict: 'ok',
      a: 'ラリー続行OK。空中でのアウトコールは「パートナーへの合図」扱いで、正式なラインコールではない。実際に入ったらそのまま打ち返せる。「out」「no」「bounce it」なども同じ扱い。',
      keywords: ['アウト', '空中', 'コール', 'パートナー', '合図'] },
    { cat: 'line', q: 'ダブルスで自分「アウト」、パートナー「イン」と判定が割れた', verdict: 'conditional',
      a: '原則「イン」扱い（疑いある時はイン有利）。ただし相手チームがアウトコールを聞いて返球を止めていた場合は相手の得点になる。2026年ルールで「conflict（不一致）」と明文化。',
      keywords: ['パートナー', '判定', '不一致', 'ダブルス', '割れる'] },
    { cat: 'line', q: 'アウトコールが遅れたらどうなる？', verdict: 'ng',
      a: '「イン」扱いになる。2026年から即座にコールする義務。パートナーが返球できるか見てからコールするとアウトでも「イン」。',
      keywords: ['アウト', 'コール', '遅い', 'タイミング'] },
    { cat: 'line', q: '相手コートで落ちたボールのジャッジは誰？', verdict: 'ok',
      a: 'そのボールが落ちた側（受ける側）のチームがジャッジ。相手コートのラインは自分たちで判定する。',
      keywords: ['ジャッジ', '判定', 'ライン', '落ちる'] },
    { cat: 'line', q: '観客に「今のアウト？」と聞いた', verdict: 'ng',
      a: '2026年から警告またはペナルティ対象。「should not」から「must not」に強化。観客への相談は禁止。',
      keywords: ['観客', '相談', '判定', 'アウト'] },

    // ===== 試合進行 =====
    { cat: 'match', q: 'タイムアウトは何回取れる？', verdict: 'ok',
      a: '1ゲームにつき2回、各1分間。15点ゲームでは3回取れる。タイムアウトは「Time-out」と声に出すか、Tハンドサインで明示。',
      keywords: ['タイムアウト', '時間', '休憩'] },
    { cat: 'match', q: 'コートチェンジはいつする？', verdict: 'ok',
      a: '片方が6点に達したらコートチェンジ（11点ゲームの場合）。15点ゲームなら8点、21点なら11点で交代。シングルスも同じ基準。',
      keywords: ['コート', 'チェンジ', '交代', '6'] },
    { cat: 'match', q: '試合前ウォームアップ中に警告される？', verdict: 'ok',
      a: 'あり得る。2026年ルールで審判はウォームアップや試合前ブリーフィング中でも警告・テクニカルファウルを出せる権限がある。',
      keywords: ['ウォームアップ', '警告', '試合前', '審判'] },
    { cat: 'match', q: 'パドルは何でも使える？', verdict: 'ng',
      a: '2026年からUSA Pickleball Approvedマーク必須。承認パドル以外は大会で試合没収。一般プレーは規制ゆるいが、大会では事前検査もあり。',
      keywords: ['パドル', '承認', 'USAPA', '大会'] },
    { cat: 'match', q: 'ボールと同じ色の服装はOK？', verdict: 'ng',
      a: '大会では変更対象になりうる。2023年改定で明文化されたRule 2.G.1「Safety and Distraction」により、トーナメントディレクター（審判ではない）が判断権限を持つ。従わないと試合没収の可能性あり。黄緑や蛍光色は避ける。',
      keywords: ['服装', 'ウェア', '色', 'ボール', '同色'] },
    { cat: 'match', q: 'シューズに規定はある？', verdict: 'ok',
      a: 'コートを傷つけないソールであることが基本。黒くマークしない、ボールと同色でない、が条件。大会でもこの2点がメイン。',
      keywords: ['シューズ', '靴', 'ソール', 'マーク'] },
    { cat: 'match', q: '「スキニーシングルス」って何？', verdict: 'ok',
      a: 'コートの半分だけを使う1対1の変則ルール。センターラインで分けるか、対角サービスコートだけを使う。運動量を減らせて練習にピッタリ。',
      keywords: ['スキニー', 'シングル', '半分', '練習'] },

    // ===== ラリー中 =====
    { cat: 'rally', q: 'サーブ後、2人ともワンバウンドさせた？', verdict: 'ok',
      a: 'OK、これが正しい。ツーバウンドルール：サーブ→レシーブ側ワンバウンド→サーブ側もワンバウンド、その後ボレーOK。',
      keywords: ['ツーバウンド', 'サーブ', 'ルール', '2バウンド'] },
    { cat: 'rally', q: 'ボールがネットポストに当たってコートに入った', verdict: 'conditional',
      a: '状況による。2026年ルールで、いったん適切にネットを越え相手コートにバウンドしたあと、風やスピンでネットポストに当たった場合は自動フォルトではない。',
      keywords: ['ネットポスト', '当たる', 'スピン', '風'] },
    { cat: 'rally', q: 'ラリー中にポケットから予備ボールが見えた', verdict: 'ng',
      a: 'フォルト。2026年ルールで、予備ボールが相手から見えたり、コートに落ちたらフォルト。ポケットに入れるときは隠す。',
      keywords: ['予備', 'ポケット', 'ボール', '見える'] },
    { cat: 'rally', q: 'パドルを両手で持って打つのはOK？', verdict: 'ok',
      a: 'OK。パドルの持ち方にルールはない。両手持ちでもバックハンド片手でも自由。ハンドスイッチ（持ち替え）も合法。',
      keywords: ['両手', 'パドル', '持ち方', 'グリップ', 'スイッチ'] },
    { cat: 'rally', q: 'ボールがパドルに当たって2回・3回以上跳ねた', verdict: 'ok',
      a: '合法。2026年ルールで、従来のダブルヒットに加え、トリプルヒット以上も明示的に認められた。条件は「一方向の連続した動き」で、意図的でないこと。ただしキャリー（パドル上で持ち運ぶ）は依然フォルト。',
      keywords: ['ダブルヒット', 'トリプル', '2回', '3回', '接触'] },
    { cat: 'rally', q: 'パドルが手から離れて打った', verdict: 'ng',
      a: 'フォルト。プレー中にパドルを投げたり、手から離れて当たったボールは無効。パドルはしっかり握る。',
      keywords: ['パドル', '落とす', '手放す', '離れる'] },
    { cat: 'rally', q: 'ボレーで体に当たったボール', verdict: 'ng',
      a: 'フォルト。パドル以外の体の部分にボールが当たったらフォルト。服や髪もダメ。ただしパドルを握っている手の「手首より下」に当たったらセーフ。',
      keywords: ['体', '当たる', 'ボレー', '服'] },
    { cat: 'rally', q: 'パドルを持つ手の手首より下にボールが当たった', verdict: 'ok',
      a: 'インプレー継続。USA Pickleball Rule 7.Hにより、パドル握ってる手の手首より下はパドルの延長扱い。リターン成功すればラリー続行。手首より上はフォルト。',
      keywords: ['手', '手首', '下', 'パドル', '延長'] },
    { cat: 'rally', q: '自分コートでバウンドしたボールが、スピンや風で相手コート側に戻った。ネット越えて打てる？', verdict: 'ok',
      a: '【オーバー・アンド・バック・ルール】OK、合法プレー。ボールが自分コートに一度バウンド→スピンや風で相手コート側に戻ったら、ネット越しに打ちに行ける。打つ時にネット・ポスト・相手コートに触れなければOK。ネットを越えるか、ポストの外側を回り込むのはOK（高さ自由）。※ネット下やポストとネットの隙間を通すのはフォルト。',
      keywords: ['スピン', '戻る', 'ネット越え', 'オーバーアンドバック', 'バックスピン'] },
    { cat: 'rally', q: '相手が打った直後、ネットを越えて相手コート側で打った', verdict: 'ng',
      a: 'フォルト（プレーン違反）。ボールがまだ相手コート上空にある段階で、ネット越しに手を伸ばして打つのはダメ。打つ瞬間はボールが自分側に来ている必要がある。打った後のフォロースルーでパドルがネット越えるのはOK。',
      keywords: ['ネット', '越える', '相手コート', 'リーチオーバー', 'プレーン'] },
    { cat: 'rally', q: 'ATP（アラウンド・ザ・ポスト）って合法？', verdict: 'ok',
      a: '合法。ネットポストの外側を回り込んで相手コートに入れるショット。ネットより低い位置でもOK（地面スレスレでも有効）。ただし①ネット下をくぐらせる ②ネットとポストの隙間を通す、は常にフォルト。打った後にポスト外側で相手側に体が越えても、相手コートや相手に触れなければOK。',
      keywords: ['ATP', 'アラウンド', 'ポスト', '回り込む'] },
    { cat: 'rally', q: 'エルネ（Erne）って何？合法？', verdict: 'ok',
      a: '合法。キッチン外側（ベースラインの外）から、ネット際でジャンプしてキッチン上空を飛び越えてボレーするショット。キッチン外で離陸→キッチン外に着地すればOK。打つ瞬間に両足がキッチン外ならフォルトにならない。',
      keywords: ['エルネ', 'Erne', 'ボレー', 'キッチン', 'ジャンプ'] },
    { cat: 'rally', q: 'ボールが自分に当たったけどコートには落ちてない', verdict: 'ng',
      a: 'フォルト。ボールが体に当たった時点でフォルト。たとえ相手のボールがアウトになりそうでも、体に当たった瞬間にアウト。',
      keywords: ['体', '当たる', 'アウト', 'フォルト'] },
    { cat: 'rally', q: '相手のプレー中に「アウト！」と叫んだ', verdict: 'ng',
      a: 'フォルト（妨害）。相手が打つ前に叫ぶのはDistraction（妨害）扱いでフォルト。アウトコールは自コート側のバウンド後のみ有効。',
      keywords: ['アウト', '叫ぶ', '妨害', 'ディストラクション'] },
    { cat: 'rally', q: 'ダブルスでラリー中、パートナーに声かけはOK？', verdict: 'conditional',
      a: '状況による。自分のチームがボール対応中ならOK（「バウンスさせて」「打って」等）。相手がボール打つ瞬間なら妨害扱いでフォルト。ボールが相手に向かっている間は静かに。',
      keywords: ['パートナー', '声かけ', 'コミュニケーション', '妨害'] },
    { cat: 'rally', q: '隣コートのボールが転がってきた', verdict: 'ok',
      a: 'ハインダー（hinder）扱いで即ストップ、リプレイ（やり直し）。安全優先。外的要因（他コートのボール、虫、風飛び物）はすべてハインダー。',
      keywords: ['ハインダー', 'リプレイ', '他コート', '安全'] },
    { cat: 'rally', q: 'ハインダーと妨害（distraction）の違いは？', verdict: 'ok',
      a: 'ハインダーは外的要因（虫・他コートのボール等）で、発生するとリプレイ。妨害は選手の故意な行為（叫ぶ・手を振る等）で、発生するとフォルト扱い。',
      keywords: ['ハインダー', '妨害', 'ディストラクション', '違い'] },
    { cat: 'rally', q: 'ラリー中にネットに触った', verdict: 'ng',
      a: 'フォルト。プレー中にネットやネットポストに触れたらフォルト。服、髪、パドル、すべて触れてもダメ。',
      keywords: ['ネット', '触る', '接触', 'ポスト'] },
    { cat: 'rally', q: '相手に物理的に暴力を振るった', verdict: 'ng',
      a: '即座に失格。2026年ルールで暴力行為・施設破損への対応が強化。大会ディレクターが即失格にできる明確な権限を持つ。',
      keywords: ['暴力', '失格', '処分', 'ペナルティ'] },
  ];

  // フィルタリング
  const filtered = rules.filter(r => {
    if (selectedCategory !== 'all' && r.cat !== selectedCategory) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      r.q.toLowerCase().includes(q) ||
      r.a.toLowerCase().includes(q) ||
      r.keywords.some(k => k.toLowerCase().includes(q))
    );
  });

  // 無料版は最初の20項目のみ表示
  const visibleItems = isPremium ? filtered : filtered.slice(0, FREE_ITEM_LIMIT);
  const lockedCount = isPremium ? 0 : Math.max(0, filtered.length - FREE_ITEM_LIMIT);

  return (
    <div>
      <SectionTitle>ルール辞典</SectionTitle>
      <p style={{ fontSize: '13px', color: '#b7e4c7', lineHeight: 1.6, marginBottom: '16px' }}>
        試合中の「これフォルト？」を瞬時に検索。USA Pickleball 2026年ルール準拠、全{rules.length}項目収録{!isPremium && `（無料版は${FREE_ITEM_LIMIT}項目まで）`}。
      </p>

      {/* 検索ボックス */}
      <div style={{
        background: '#143d24',
        borderRadius: '12px',
        padding: '4px 4px 4px 14px',
        border: '1px solid #2d6a4f',
        marginBottom: '14px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        <span style={{ fontSize: '16px' }}>🔍</span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="キーワードで検索（例: キッチン、サーブ）"
          style={{
            flex: 1,
            padding: '10px 4px',
            background: 'transparent',
            border: 'none',
            color: '#fff',
            fontSize: '14px',
            fontFamily: 'inherit',
            outline: 'none',
            minWidth: 0,
          }}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            style={{
              padding: '8px 10px',
              background: '#0a1f14',
              border: 'none',
              color: '#b7e4c7',
              borderRadius: '8px',
              fontSize: '12px',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            ×
          </button>
        )}
      </div>

      {/* カテゴリフィルタ */}
      <div style={{
        display: 'flex',
        gap: '6px',
        overflowX: 'auto',
        marginBottom: '16px',
        paddingBottom: '4px',
      }}>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            style={{
              padding: '8px 12px',
              background: selectedCategory === cat.id ? '#ffd60a' : 'transparent',
              color: selectedCategory === cat.id ? '#0a1f14' : '#b7e4c7',
              border: selectedCategory === cat.id ? 'none' : '1px solid #2d6a4f',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
              fontFamily: 'inherit',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span>{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* 検索結果件数 */}
      <div style={{
        fontSize: '11px',
        color: '#b7e4c7',
        marginBottom: '10px',
        paddingLeft: '4px',
      }}>
        {filtered.length}件 {searchQuery && `/ 検索: "${searchQuery}"`}
      </div>

      {/* ルールリスト */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filtered.length === 0 ? (
          <div style={{
            background: '#143d24',
            borderRadius: '14px',
            padding: '30px 16px',
            border: '1px dashed #2d6a4f',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '40px', marginBottom: '8px' }}>🔍</div>
            <p style={{ margin: 0, fontSize: '13px', color: '#b7e4c7', lineHeight: 1.6 }}>
              該当するルールが見つかりませんでした<br/>
              別のキーワードでお試しください
            </p>
          </div>
        ) : (
          <>
            {visibleItems.map((rule, i) => <RuleCard key={i} rule={rule} />)}
            {lockedCount > 0 && (
              <div style={{
                background: 'linear-gradient(135deg, #1a4d2e 0%, #143d24 100%)',
                borderRadius: '14px',
                padding: '20px 16px',
                border: '2px solid #ffd60a',
                textAlign: 'center',
                marginTop: '8px',
              }}>
                <div style={{ fontSize: '36px', marginBottom: '8px' }}>🔒</div>
                <div style={{
                  fontSize: '11px',
                  letterSpacing: '2px',
                  color: '#ffd60a',
                  fontWeight: 800,
                  marginBottom: '8px',
                }}>
                  無料版の表示は{FREE_ITEM_LIMIT}項目まで
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#fff',
                  fontWeight: 900,
                  marginBottom: '4px',
                }}>
                  あと <span style={{ color: '#ffd60a' }}>{lockedCount}項目</span> が有料版で解放
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#b7e4c7',
                  lineHeight: 1.5,
                  marginBottom: '14px',
                }}>
                  ATP・エルネ・2026年改定など、マニアックな特殊状況も全カバー
                </div>
                <button
                  onClick={() => openPaywall('ルール辞典 全59項目')}
                  style={{
                    padding: '12px 24px',
                    background: 'linear-gradient(135deg, #ffd60a 0%, #f9a825 100%)',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#0a1f14',
                    fontSize: '13px',
                    fontWeight: 900,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  🔓 note記事で全機能解放
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <div style={{
        marginTop: '20px',
        padding: '10px 12px',
        background: '#143d24',
        borderRadius: '10px',
        border: '1px dashed #2d6a4f',
        fontSize: '11px',
        color: '#b7e4c7',
        lineHeight: 1.6,
      }}>
        ⚠️ 公式審判の代わりではありません。大会では主審の判断が優先されます。練習やレク戦での参考にどうぞ。
      </div>
    </div>
  );
}

function RuleCard({ rule }) {
  const [expanded, setExpanded] = useState(false);
  const verdictConfig = {
    ok: { label: '✅ OK', color: '#4caf50', bg: 'rgba(76, 175, 80, 0.15)' },
    ng: { label: '❌ フォルト', color: '#ff6b35', bg: 'rgba(255, 107, 53, 0.15)' },
    conditional: { label: '⚠️ 状況による', color: '#ffd60a', bg: 'rgba(255, 214, 10, 0.15)' },
  };
  const cfg = verdictConfig[rule.verdict];

  return (
    <div style={{
      background: '#143d24',
      borderRadius: '12px',
      border: '1px solid #2d6a4f',
      borderLeft: `4px solid ${cfg.color}`,
      overflow: 'hidden',
    }}>
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: '100%',
          padding: '12px 14px',
          background: 'transparent',
          border: 'none',
          color: '#fff',
          cursor: 'pointer',
          fontFamily: 'inherit',
          textAlign: 'left',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <div style={{
          background: cfg.bg,
          color: cfg.color,
          borderRadius: '6px',
          padding: '3px 8px',
          fontSize: '11px',
          fontWeight: 900,
          flexShrink: 0,
          whiteSpace: 'nowrap',
        }}>
          {cfg.label}
        </div>
        <div style={{ flex: 1, fontSize: '13px', color: '#e8f5e9', fontWeight: 700, lineHeight: 1.4 }}>
          {rule.q}
        </div>
        <div style={{
          color: '#ffd60a',
          fontSize: '12px',
          flexShrink: 0,
          transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s',
        }}>
          ▼
        </div>
      </button>

      {expanded && (
        <div style={{
          padding: '0 14px 14px 14px',
          borderTop: '1px solid #2d6a4f',
          paddingTop: '12px',
          marginTop: '4px',
          marginLeft: '10px',
          marginRight: '10px',
        }}>
          <p style={{
            margin: 0,
            fontSize: '13px',
            color: '#e8f5e9',
            lineHeight: 1.7,
          }}>
            {rule.a}
          </p>
        </div>
      )}
    </div>
  );
}

// ==================== Shared Components ====================
function SectionTitle({ children, style = {} }) {
  return (
    <h2 style={{
      fontSize: '18px',
      fontWeight: 900,
      color: '#fff',
      margin: '0 0 12px',
      paddingLeft: '12px',
      borderLeft: '4px solid #ffd60a',
      ...style,
    }}>
      {children}
    </h2>
  );
}

function StatCard({ label, value, sub, highlight }) {
  return (
    <div style={{
      background: highlight ? 'linear-gradient(135deg, #ffd60a 0%, #f9a825 100%)' : '#143d24',
      borderRadius: '12px',
      padding: '12px',
      border: highlight ? 'none' : '1px solid #2d6a4f',
      textAlign: 'center',
    }}>
      <div style={{
        fontSize: '11px',
        color: highlight ? '#0a1f14' : '#b7e4c7',
        fontWeight: 700,
        marginBottom: '4px',
      }}>{label}</div>
      <div style={{
        fontSize: '22px',
        fontWeight: 900,
        color: highlight ? '#0a1f14' : '#ffd60a',
        lineHeight: 1,
      }}>{value}</div>
      <div style={{
        fontSize: '10px',
        color: highlight ? '#0a1f14' : '#b7e4c7',
        opacity: 0.8,
        marginTop: '2px',
      }}>{sub}</div>
    </div>
  );
}
