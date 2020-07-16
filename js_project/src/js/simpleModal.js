(function ($) {
  $.fn.simpleModal = function (options) {
    const settings = $.extend({
      title: 'Modal title',
      description: 'Modal description',
      type: 'Basic',
      buttons: 1, // 1 button is only OK, 2 buttons is OK and Cancel
    }, options);

    if (document.querySelector('.simpleModal')) {
      return;
    }

    createModal(settings);

    // Add close event on buttons on click
    $('.simpleModal').on('click', function (event) {
      if (event.target.classList.contains('close')) {
        $(this).off('click');
        $(this).slideUp(400, () => {
          $('body').children().not('script, .simpleModal').removeClass('blur-it');
          $(this).remove();
        });
      }
    });

    return this;
  };
})(jQuery);

function createModal({title, description, type, buttons}) {
  let color;

  switch (type) {
    case 'warning':
      color = '#D94C3E';
      break;
    case 'success':
      color = '#4AB62E';
      break;
    case 'info':
      color = '#5385F6';
      break;
    default:
      color = '#5C5C5C';
  }

  $('body').append(`
    <div class="simpleModal close">
      <div class="simpleModal-body" style="background: ${color}">
        <h2 class="simpleModal__title">${title}</h2>
        <p class="simpleModal__text">${description}</p>
        <div class="simpleModal__buttons">
          <button type="submit" class="simpleModal__button close">Ok</button>
        </div>
        <button class="simpleModal__close close"></button>
      </div>
    </div>
  `);

  if (buttons === 2) {
    $('.simpleModal__buttons').append('<button type="submit" class="simpleModal__button close">Cancel</button>');
  }

  $('.simpleModal').slideDown(400);
  $('body').children().not('script, .simpleModal').addClass('blur-it');
}

const subscribe = {
  title: 'Subscribe',
  description: 'Subscribe to this blog and be the first to know about updates',
  type: 'info',
  buttons: 1,
};

$(document).ready(() => {
  setTimeout($.fn.simpleModal, 10000, subscribe);
});
