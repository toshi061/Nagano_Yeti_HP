/**
 * 長野県ハンドボールクラブ - フォームバリデーション
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');

  if (!form) return;

  // バリデーションルール
  const validators = {
    category: {
      validate: (value) => value !== '',
      message: 'お問い合わせ種別を選択してください'
    },
    name: {
      validate: (value) => value.trim().length >= 2,
      message: 'お名前は2文字以上で入力してください'
    },
    email: {
      validate: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: '正しいメールアドレスを入力してください'
    },
    message: {
      validate: (value) => value.trim().length >= 10,
      message: 'お問い合わせ内容は10文字以上で入力してください'
    },
    privacy: {
      validate: (element) => element.checked,
      message: '個人情報保護方針への同意が必要です'
    }
  };

  // エラーメッセージを表示
  const showError = (fieldName, message) => {
    const errorElement = document.getElementById(`${fieldName}Error`);
    const inputElement = document.getElementById(fieldName) || document.querySelector(`[name="${fieldName}"]`);

    if (errorElement) {
      errorElement.textContent = message;
    }

    if (inputElement) {
      inputElement.classList.add('error');
    }
  };

  // エラーメッセージをクリア
  const clearError = (fieldName) => {
    const errorElement = document.getElementById(`${fieldName}Error`);
    const inputElement = document.getElementById(fieldName) || document.querySelector(`[name="${fieldName}"]`);

    if (errorElement) {
      errorElement.textContent = '';
    }

    if (inputElement) {
      inputElement.classList.remove('error');
    }
  };

  // 個別フィールドのバリデーション
  const validateField = (fieldName) => {
    const validator = validators[fieldName];
    if (!validator) return true;

    const element = document.getElementById(fieldName) || document.querySelector(`[name="${fieldName}"]`);
    if (!element) return true;

    const value = element.type === 'checkbox' ? element : element.value;
    const isValid = validator.validate(value);

    if (isValid) {
      clearError(fieldName);
    } else {
      showError(fieldName, validator.message);
    }

    return isValid;
  };

  // すべてのフィールドをバリデーション
  const validateForm = () => {
    let isValid = true;

    Object.keys(validators).forEach(fieldName => {
      if (!validateField(fieldName)) {
        isValid = false;
      }
    });

    return isValid;
  };

  // リアルタイムバリデーション
  Object.keys(validators).forEach(fieldName => {
    const element = document.getElementById(fieldName) || document.querySelector(`[name="${fieldName}"]`);

    if (element) {
      // 入力時のバリデーション
      element.addEventListener('blur', () => {
        validateField(fieldName);
      });

      // エラークリア
      element.addEventListener('input', () => {
        if (element.classList.contains('error')) {
          clearError(fieldName);
        }
      });

      // チェックボックスの場合
      if (element.type === 'checkbox') {
        element.addEventListener('change', () => {
          validateField(fieldName);
        });
      }
    }
  });

  // フォーム送信
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // すべてのフィールドをバリデーション
    if (!validateForm()) {
      // 最初のエラーフィールドにスクロール
      const firstError = form.querySelector('.error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstError.focus();
      }
      return;
    }

    // フォームデータを取得（実際の送信処理はここに実装）
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    console.log('送信データ:', data);

    // 送信成功時の処理
    form.style.display = 'none';
    const successMessage = document.getElementById('formSuccess');
    if (successMessage) {
      successMessage.style.display = 'block';
      successMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // 実際のプロジェクトでは、ここでAjax送信などを行う
    // 例:
    // fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // })
    // .then(response => response.json())
    // .then(result => {
    //   // 成功処理
    // })
    // .catch(error => {
    //   // エラー処理
    // });
  });

  // リセットボタン
  form.addEventListener('reset', () => {
    // すべてのエラーをクリア
    Object.keys(validators).forEach(fieldName => {
      clearError(fieldName);
    });
  });
});
